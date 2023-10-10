import React, { useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from '../../components/Header/HeaderComponent';
import styles from './DashboardComponent.module.scss';
import { UserContext } from '../../contextes/UserContext';

export function DashboardComponent() {
  const headerRef = useRef<HTMLDivElement>();
  const containerNavRef = useRef<HTMLDivElement>();
  const [offHeight, setOffHeight] = React.useState(0);
  const [guilds, setGuilds] = React.useState<DiscordGuild[]>([]);
  const user = useContext(UserContext);

  useEffect(() => {
    const offHeightHeaderResult = headerRef.current?.clientHeight || 0;
    setOffHeight(offHeightHeaderResult);
  }, []);

  return (
    <div className={styles.body}>
      <HeaderComponent ref={headerRef as React.MutableRefObject<HTMLDivElement>} />

      <div className={styles.main} style={{ height: `calc(100vh - ${offHeight}px)` }}>
        <div className={styles.side} style={{ height: `calc(100vh - ${offHeight}px)` }} />

        <div className={styles.container} style={{ height: `calc(100vh - ${offHeight}px)` }}>
          {user.apiUser && user.discordUser ? (
            <>
              <div
                ref={containerNavRef as React.MutableRefObject<HTMLDivElement>}
                className={styles.nav}
              >
                <button type="button">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                <h2>
                  Component name
                </h2>
              </div>

              <div className={styles.content} style={{ height: `calc(100% - ${containerNavRef.current?.clientHeight}px - 3rem)` }}>
                <div className={styles.guilds}>
                  guild selection
                  <div className={styles.test} />
                </div>

                {/* <div className={styles.features}>
                  feature selection
                </div> */}
              </div>

              {/* <div className={styles.tools}>
                save button & others tools?
              </div> */}
            </>
          ) : (
            <div className={styles.noUser}>
              <div className={styles.panel}>
                No user logged in
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
