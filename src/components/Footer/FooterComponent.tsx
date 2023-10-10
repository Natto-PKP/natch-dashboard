import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import config from '../../config.json';

import styles from './FooterComponent.module.scss';

export const FooterComponent = React.forwardRef<HTMLElement>((_props, ref) => (
  <footer className={styles.footer} ref={ref}>
    <div className={styles.links}>
      <a href={config.support} target="_blank" rel="noreferrer">
        Support discord server
        <FontAwesomeIcon icon={faDiscord} />
      </a>
      <a href={config.github} target="_blank" rel="noreferrer">
        Github
        <FontAwesomeIcon icon={faGithubAlt} />
      </a>
    </div>

    <div className={styles.credits}>
      <span>© 2021 Natch</span>
      -
      <span>All rights reserved</span>
    </div>
  </footer>
));
