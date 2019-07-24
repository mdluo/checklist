import React from 'react';
import Link from './Link';

import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="wrapper">
        <div className={styles.info}>
          <p className="bp3-ui-text bp3-text-muted">
            Icon made by{' '}
            <Link
              href="https://www.flaticon.com/authors/eucalyp"
              title="Eucalyp"
            >
              Eucalyp
            </Link>{' '}
            is licensed by{' '}
            <Link
              href="http://creativecommons.org/licenses/by/3.0/"
              title="Creative Commons BY 3.0"
            >
              CC 3.0 BY
            </Link>
          </p>
          <p className="bp3-ui-text bp3-text-muted">
            &copy; 2019. Made by mdluo.{' '}
            <Link href="https://github.com/mdluo/checklist">GitHub</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
