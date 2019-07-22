import React, { useEffect } from 'react';
import { InputGroup, Tooltip, Button, Spinner } from '@blueprintjs/core';
import ClipboardJS from 'clipboard';
import { encode } from '../utils/base64';
import { State } from './App';

import styles from './Footer.module.css';

interface Props {
  state: State;
  sectionIndexes: number[];
}

const Footer: React.FC<Props> = ({ state, sectionIndexes }) => {
  let checked = 0;
  let total = 0;

  sectionIndexes.forEach((index, i) => {
    const start = index + 1;
    const end = sectionIndexes[i + 1];
    const section = state.slice(start, end);
    if (state[index]) {
      checked += section.reduce((acc, cur) => (acc += Number(cur)), 0);
      total += section.length;
    }
  });

  const score = total === 0 ? 0 : checked / total;
  const url = score === 0 ? '' : encode(state);
  const fullUrl = `${window.location.origin}/${url}`;

  useEffect(() => {
    window.history.replaceState({}, '', fullUrl);
  });

  useEffect(() => {
    new ClipboardJS('#copy');
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.result}>
          <InputGroup
            className={styles.input}
            leftIcon="link"
            rightElement={
              <Tooltip content="Click to copy">
                <Button
                  id="copy"
                  minimal
                  icon="clipboard"
                  data-clipboard-text={fullUrl}
                />
              </Tooltip>
            }
            fill
            large
            onFocus={e => e.target.setSelectionRange(0, fullUrl.length)}
            value={fullUrl}
            onChange={() => undefined}
          />
          <div className={styles.right}>
            <Spinner intent="primary" size={55} value={score} />
            <p className={styles.score}>{(score * 100).toFixed(0)}%</p>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <p className="bp3-ui-text bp3-text-muted">
            Icon made by&nbsp;
            <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">
              Eucalyp
            </a>
            &nbsp;is licensed by&nbsp;
            <a
              href="http://creativecommons.org/licenses/by/3.0/"
              title="Creative Commons BY 3.0"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC 3.0 BY
            </a>
          </p>
          <p className="bp3-ui-text bp3-text-muted">
            &copy; 2019. Made by mdluo. &nbsp;
            <a
              href="https://github.com/mdluo/checklist"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
