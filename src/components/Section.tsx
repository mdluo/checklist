import React, { Fragment } from 'react';
import {
  Card,
  Collapse,
  Icon,
  Divider,
  Checkbox,
  Switch,
} from '@blueprintjs/core';
import { State } from './App';

import styles from './Section.module.css';

interface Props {
  state: State;
  index: number;
  section: {
    subject: string;
    link: string;
    description: string;
    items: string[];
  };
  dispatch: React.Dispatch<number>;
}

const Section: React.FC<Props> = ({ state, section, index, dispatch }) => {
  return (
    <section className={styles.section}>
      <div className="wrapper">
        <Card className={styles.card} elevation={1}>
          <h4 className="bp3-heading">
            <Switch
              className={styles.switch}
              large
              inline
              checked={state[index]}
              onChange={() => dispatch(index)}
            />
            {section.link ? (
              <a href={section.link} target="_blank" rel="noopener noreferrer">
                {section.subject}
                <Icon className={styles.linkIcon} icon="share" iconSize={12} />
              </a>
            ) : (
              section.subject
            )}
          </h4>
          <p className="bp3-text-large bp3-running-text bp3-text-muted">
            {section.description}
          </p>
          <Collapse isOpen={state[index]}>
            <div className={styles.checklist}>
              {section.items.map((item, i, { length }) => (
                <Fragment key={item}>
                  <Checkbox
                    className={styles.option}
                    large
                    label={item}
                    checked={state[index + i + 1]}
                    onChange={() => dispatch(index + i + 1)}
                  />
                  {i < length - 1 && <Divider />}
                </Fragment>
              ))}
            </div>
          </Collapse>
        </Card>
      </div>
    </section>
  );
};

export default Section;
