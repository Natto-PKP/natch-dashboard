import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowRightToBracket, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { GlobalStats, type SupportGuildPreview } from '@natchy/natch-api-package-client';
import { useNavigate } from 'react-router-dom';
import { HeaderComponent } from '../../components/Header/HeaderComponent';
import styles from './HomeDesktopPage.module.scss';
import config from '../../config.json';
import { HomeFeatures } from './HomeVariables';
import { client } from '../../client';

export function HomeDesktopPage() {
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
      <HeaderComponent />

      <div className={styles.main}>
        <div className={styles.presentation}>
          <div className={styles['stat-box']}>
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
          </div>

          <div className={styles.me}>
            <div className={styles.panel}>
              <div className={styles.header}>
                <a href={config.github} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </a>
                <a href={config.support} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faDiscord} size="lg" />
                </a>
              </div>

              <div className={styles.content}>
                <div className={styles.avatar}>
                  <img src={`${process.env.PUBLIC_URL}/images/natch-avatar.png`} alt="Natch avatar" />
                </div>

                <div className={styles.name}>
                  <h1>Natch</h1>
                  <h2>multitool bot</h2>
                </div>
              </div>

              <div className={styles.links}>
                <a className={styles.invite} href="d" target="_blank">Invite</a>
                <button className={styles.dashboard} type="button" onClick={() => navigate('/dashboard')}>Dashboard</button>
              </div>
            </div>

            <div className={styles.side}>

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

              <div className={styles.source}>
                <div className={styles.content}>
                  <a href="https://isekai.fandom.com/wiki/Neta_Character_Tensei_toka_Anmari_da!" target="_blank" rel="noreferrer">
                    Neta Chara Tensei Toka Anmarida
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </a>
                  <p>
                    Tooru Aikawa is a university student who spends his days going
                    through the motions of attending school and working at a local
                    convenience store. He only feels alive
                    when he&apos;s playing the massive multiplayer VR game Real World Online.
                  </p>
                  <p>
                    One day, he has a stroke of luck: he&apos;s hit by a runaway bus and
                    reincarnated
                    as his game character. But something&apos;s gone wrong... Instead of the
                    invincible warrior he mains, he&apos;s in the body of Nacht Schatten,
                    the alluring dragon princess he made as a joke! Nacht&apos;s build
                    is anything but optimized—she would never survive in the cutthroat
                    world of an isekai story! And more to the point, she&apos;s a girl!
                    But perhaps things aren&apos;t as bad as they seem as Nacht
                    Schatten is more capable than she appears.
                  </p>
                </div>

                <img src={`${process.env.PUBLIC_URL}/images/natch-source.png`} alt="source of natch" />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.features}>
          {HomeFeatures.map((feature, i) => (
            <div key={feature.name} className={`${styles.item} ${i % 2 !== 0 ? styles.alt : ''}`}>
              <div className={styles.feature}>
                <img src={`${process.env.PUBLIC_URL}/images/${feature.image}`} alt={feature.name} />

                <div className={styles.content}>
                  <div className={styles.header}>
                    <FontAwesomeIcon className={styles.icon} icon={feature.icon} size="2x" />
                    <h3>{feature.name}</h3>
                  </div>

                  <p className={styles.description}>{feature.description}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
