// import { type SupportGuildPreview } from '@natchy/natch-api-package-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowRightToBracket, faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';
import { GlobalStats, SupportGuildPreview } from '@natchy/natch-api-package-client';
import { useNavigate } from 'react-router-dom';
import config from '../../config.json';
import styles from './HomeMobilePage.module.scss';
import { HomeFeatures } from './HomeVariables';
import { client } from '../../client';

// home page inspired by https://elements.envato.com/mateo-social-ui-app-concept-TZWWQ5Y?irgwc=1&clickid=TN3Xx%3A3kfxyPULHSKy2lIyNCUkFWiY3stwUoQY0&iradid=298927&utm_campaign=elements_af_84779&iradtype=ONLINE_TRACKING_LINK&irmptype=mediapartner&utm_medium=affiliate&utm_source=impact_radius&mp=Compact%20Creative

const features = HomeFeatures;

export function HomeMobilePage() {
  const [supportServer, setSupportServer] = useState<null | SupportGuildPreview>(null);
  const [globalStats, setGlobalStats] = useState<null | GlobalStats>(null);
  const [randomStat, setRandomStat] = useState<{ label: string, value: number } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    client.utils.getSupportGuildPreview().then((guild) => setSupportServer(guild));
    client.utils.getGlobalStats().then((stats) => setGlobalStats(stats));

    const stats = [
      { label: 'levels gained', value: globalStats?.levelGainedCount || 0 },
      { label: 'gpt messages', value: globalStats?.conversationMessageCount || 0 },
    ];

    const currentIndex = stats.findIndex((stat) => stat.label === randomStat?.label);
    const next = currentIndex === stats.length - 1 || currentIndex < 0 ? 0 : currentIndex + 1;
    setRandomStat(stats[next]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.preview}>
        <header className={styles.header}>
          <div className={styles.links}>
            <a href={config.github} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href={config.support} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faDiscord} size="2x" />
            </a>
          </div>
        </header>

        <main className={styles.content}>
          <div className={styles.presentation}>
            <div className={styles.avatar}>
              <img src={`${process.env.PUBLIC_URL}/images/natch-avatar.png`} alt="Natch avatar" />
            </div>

            <div className={styles.name}>
              <h1>Natch</h1>
              <h2>multitool bot</h2>
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <h3>{globalStats ? globalStats.userCount : '?'}</h3>
                <span>users</span>
              </div>

              <div className={styles.stat}>
                <h3>{globalStats ? globalStats.guildCount : '?'}</h3>
                <span>guilds</span>
              </div>

              <div className={styles.stat}>
                <h3>{randomStat ? randomStat.value : '?'}</h3>
                <span>{randomStat ? randomStat.label : '?'}</span>
              </div>
            </div>

            <div className={styles.buttons}>
              <button type="button">Invite</button>
              <button className={styles.alt} type="button" onClick={() => navigate('/dashboard')}>Dashboard</button>
            </div>
          </div>
        </main>
      </div>

      <div className={styles.features}>
        {/* <h2 className={styles.title}>Features</h2> */}

        <ul className={styles.list}>
          {features.map((feature, i) => (
            <li key={feature.name}>
              <div className={`${styles.item} ${i % 2 !== 0 ? styles.alt : ''}`}>
                <FontAwesomeIcon className={styles.icon} icon={feature.icon} size="2x" />

                <div className={styles.content}>
                  <h3>{feature.name}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>

              {features.length - 1 > i && <div className={styles.divider} />}
            </li>
          ))}
        </ul>
      </div>

      <a href={config.support} target="_blank" className={styles.support} rel="noreferrer">
        <div className={styles.icon}>
          <img src={(supportServer && supportServer.icon) || `${process.env.PUBLIC_URL}/images/natch-avatar.png`} alt="support server icon" />
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.name}>{supportServer ? supportServer.name : 'Support server'}</h2>

            <div className={styles.activity}>
              <span className={styles.online}>
                {supportServer ? supportServer.presences : '?'}
                {' '}
                online
              </span>
              <span className={styles.total}>
                {supportServer ? supportServer.members : '?'}
                {' '}
                members
              </span>
            </div>
          </div>

          <div className={styles.buttons}>
            <button className={styles.join} type="button">
              <FontAwesomeIcon icon={faArrowRightToBracket} />
            </button>
          </div>
        </div>
      </a>

      <div className={styles.origin}>
        <h2 className={styles.title}>Where does Natch come from?</h2>

        <div className={styles.content}>
          <a className={styles.source} href="https://isekai.fandom.com/wiki/Neta_Character_Tensei_toka_Anmari_da!" target="_blank" rel="noreferrer">
            Neta Chara Tensei Toka Anmarida
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>

          <div className={styles.information}>
            <p className={styles.description}>
              Neta Chara Tensei Toka Anmarida is a Japanese light novel
              series written by Otonashi, Kanade with illustrated by
              Azutarou and is based on the Web novels of the same name.
              The light novel series was adapted into a manga series with
              illustrations by Amano, Kamuragi and serialized by MAGCOMI.
            </p>

            <img className={styles.illustration} src={`${process.env.PUBLIC_URL}/images/natch-source.png`} alt="Neta Chara Tensei Toka Anmarida" />

          </div>
        </div>
      </div>
    </div>
  );
}
