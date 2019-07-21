import React, { useReducer } from 'react';
import { FocusStyleManager } from '@blueprintjs/core';
import Section from './Section';
import Footer from './Footer';
import { decode } from '../utils/base64';

import styles from './App.module.css';

import logo from '../logo.svg';
import { ReactComponent as GithubCorner } from '../github-corner.svg';
import checklist from '../checklist.json';

FocusStyleManager.onlyShowFocusOnTabs();

export interface State {
  [key: string]: StateSection;
}
export interface StateSection {
  enabled: boolean;
  items: {
    [key: string]: boolean;
  };
}

export interface Action {
  type: 'section' | 'item';
  payload: number[];
}

let bytes: boolean[] | null;
const { pathname } = window.location;
if (pathname.startsWith('/') && pathname.length > 1) {
  bytes = decode(pathname.slice(1));
}

const initialState: State = {};

let cursor = 0;
checklist.sections.forEach((section, i) => {
  const sectionObj: StateSection = {
    enabled: bytes ? bytes[cursor] : true,
    items: {},
  };
  section.items.forEach((_, j) => {
    sectionObj.items[`${j}`] = bytes ? bytes[cursor + 1 + j] : false;
  });
  initialState[`${i}`] = sectionObj;
  cursor += section.items.length;
});

function reducer(state: State, action: Action) {
  const sectionKey = `${action.payload[0]}`;
  const itemKey = `${action.payload[1]}`;
  switch (action.type) {
    case 'section':
      return {
        ...state,
        [sectionKey]: {
          ...state[sectionKey],
          enabled: !state[sectionKey].enabled,
        },
      };
    case 'item':
      return {
        ...state,
        [sectionKey]: {
          ...state[sectionKey],
          items: {
            ...state[sectionKey].items,
            [itemKey]: !state[sectionKey].items[itemKey],
          },
        },
      };
    default:
      throw new Error();
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
          index={i}
          section={section}
          stateSection={state[i]}
          dispatch={dispatch}
        />
      ))}
      <Footer state={state} />
    </div>
  );
};

export default App;
