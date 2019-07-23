import React, { useState, useEffect } from 'react';
import {
  ResizeSensor,
  FormGroup,
  InputGroup,
  Tooltip,
  Button,
  Spinner,
} from '@blueprintjs/core';
import ClipboardJS from 'clipboard';
import { encode } from '../utils/base64';
import { State } from './App';

import styles from './Result.module.css';

interface Props {
  state: State;
  sectionIndexes: number[];
}

type Intent = 'none' | 'danger' | 'warning' | 'primary' | 'success' | undefined;

const Result: React.FC<Props> = ({ state, sectionIndexes }) => {
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
  let scoreIntent: Intent;
  if (score < 0.2) {
    scoreIntent = 'none';
  } else if (0.2 <= score && score < 0.4) {
    scoreIntent = 'danger';
  } else if (0.4 <= score && score < 0.6) {
    scoreIntent = 'warning';
  } else if (0.6 <= score && score < 0.8) {
    scoreIntent = 'primary';
  } else if (0.8 <= score) {
    scoreIntent = 'success';
  }

  const url = score === 0 ? '' : encode(state);
  const fullUrl = `${window.location.origin}/${url}`;

  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.history.replaceState({}, '', fullUrl);
  });

  useEffect(() => {
    new ClipboardJS('#copy1');
    new ClipboardJS('#copy2');
  }, []);

  return (
    <ResizeSensor onResize={() => setIsMobile(window.innerWidth <= 720)}>
      <div className={styles.result}>
        <div className="wrapper">
          <div className={styles.inner}>
            {!isMobile ? (
              <FormGroup
                className={styles.input}
                label="Share the result with this non-tracking link"
              >
                <InputGroup
                  leftIcon="link"
                  rightElement={
                    <Tooltip
                      lazy={false}
                      isOpen={copied ? true : undefined}
                      intent={copied ? 'primary' : 'none'}
                      content={copied ? 'Copied' : 'Click to copy'}
                    >
                      <Button
                        id="copy1"
                        minimal
                        icon="clipboard"
                        data-clipboard-text={fullUrl}
                        onClick={() => {
                          setCopied(true);
                          setTimeout(() => setCopied(false), 1000);
                        }}
                      />
                    </Tooltip>
                  }
                  fill
                  large
                  onFocus={e => e.target.setSelectionRange(0, fullUrl.length)}
                  value={fullUrl}
                  onChange={() => undefined}
                />
              </FormGroup>
            ) : (
              <Button
                id="copy2"
                className={styles.button}
                intent={copied ? 'primary' : 'none'}
                icon={copied ? 'tick' : 'clipboard'}
                alignText="center"
                fill
                large={!isMobile}
                data-clipboard-text={fullUrl}
                onClick={() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1000);
                }}
                text={copied ? 'Copied' : 'Copy the non-tracking result link'}
              />
            )}
            <div className={styles.right}>
              <Spinner
                intent={scoreIntent}
                size={isMobile ? 45 : 60}
                value={score}
              />
              <p className={styles.score}>{(score * 100).toFixed(0)}</p>
            </div>
          </div>
        </div>
      </div>
    </ResizeSensor>
  );
};

export default Result;
