import React, { Fragment } from 'react';
import {
  Card,
  Collapse,
  Icon,
  Divider,
  Checkbox,
  Switch,
} from '@blueprintjs/core';
import { StateSection, Action } from './App';

import styles from './Section.module.css';

interface Props {
  index: number;
  section: {
    subject: string;
    link: string;
    description: string;
    items: string[];
  };
  stateSection: StateSection;
  dispatch: React.Dispatch<Action>;
}

const Section: React.FC<Props> = ({
  section,
  index,
  stateSection,
  dispatch,
}) => {
  return (
    <Card className={styles.card} elevation={1}>
      <h4 className="bp3-heading">
        <Switch
          className={styles.switch}
          large
          inline
          checked={stateSection.enabled}
          onChange={() =>
            dispatch({
              type: 'section',
              payload: [index],
            })
          }
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
      <Collapse isOpen={stateSection.enabled}>
        <div className={styles.checklist}>
          {section.items.map((item, i, { length }) => (
            <Fragment key={item}>
              <Checkbox
                className={styles.option}
                large
                label={item}
                checked={stateSection.items[i]}
                onChange={() =>
                  dispatch({
                    type: 'item',
                    payload: [index, i],
                  })
                }
              />
              {i < length - 1 && <Divider />}
            </Fragment>
          ))}
        </div>
      </Collapse>
    </Card>
  );
};

export default Section;
