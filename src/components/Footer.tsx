import React from 'react';

import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="wrapper">
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
            &copy; 2019. Made by mdluo.&nbsp;
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
