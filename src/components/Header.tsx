import React from 'react';

import styles from './Header.module.css';
import logo from '../logo.svg';

interface Props {
  heading: string;
  description: string;
}

const Header: React.FC<Props> = ({ heading, description }) => {
  return (
    <div className={styles.header}>
      <div className="wrapper">
        <div className={styles.inner}>
          <img className={styles.logo} src={logo} alt="logo" />
          <div>
            <h2 className="bp3-heading">{heading}</h2>
            <p className="bp3-text-large bp3-running-text bp3-text-muted">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
