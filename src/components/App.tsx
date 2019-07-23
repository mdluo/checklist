import React, { useReducer, useEffect } from 'react';
import { FocusStyleManager } from '@blueprintjs/core';
import { decode } from '../utils/base64';
import Section from './Section';
import Result from './Result';
import Footer from './Footer';

import styles from './App.module.css';

import { ReactComponent as GithubCorner } from '../github-corner.svg';
import logo from '../logo.svg';
import checklist from '../checklist.json';

export type State = boolean[];

let sectionIndexes: number[] = [];
const totalOptions = checklist.sections.reduce((counter, section) => {
  sectionIndexes.push(counter);
  return counter + section.items.length + 1;
}, 0);

let initialState: State;
const { pathname } = window.location;
if (pathname.startsWith('/') && pathname.length > 1) {
  initialState = decode(pathname.slice(1));
} else {
  initialState = new Array(totalOptions).fill(false);
  sectionIndexes.forEach(index => (initialState[index] = true));
}

function reducer(state: State, index: number) {
  if (index < 0 || index >= state.length) {
    throw new Error();
  }
  return state.slice(0, index).concat(!state[index], state.slice(index + 1));
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    FocusStyleManager.onlyShowFocusOnTabs();
  }, []);

  return (
    <div className={styles.app}>
      <a
        className="github-corner"
        href="https://github.com/mdluo/checklist"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubCorner />
      </a>
      <div className={styles.header}>
        <img className={styles.logo} src={logo} alt="logo" />
        <div>
          <h2 className="bp3-heading">{checklist.heading}</h2>
          <p className="bp3-text-large bp3-running-text bp3-text-muted">
            {checklist.description}
          </p>
        </div>
      </div>
      {checklist.sections.map((section, i) => (
        <Section
          key={section.link}
          state={state}
          index={sectionIndexes[i]}
          section={section}
          dispatch={dispatch}
        />
      ))}
      <Result state={state} sectionIndexes={sectionIndexes} />
      <Footer />
    </div>
  );
};

export default App;
