import React, { useContext, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './HeaderComponent.module.scss';
import { UserContext } from '../../contextes/UserContext';
import config from '../../config.json';
import { AuthService } from '../../services/AuthService';
import { useUserRefresh } from '../../hooks/useUserRefresh';

const DISCORD_LOGIN_URL = `https://discord.com/api/oauth2/authorize?client_id=${config.clientId}&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Flogin%2Fcallback&response_type=code&scope=identify%20guilds`;

export const HeaderComponent = React.forwardRef<HTMLDivElement>((_props, ref) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useContext(UserContext);
  useUserRefresh({ to: location.pathname });

  const logout = useCallback(() => {
    user.setApiUser(null);
    user.setDiscordUser(null);
    AuthService.clearAuthInLocalStorage();
    navigate('/');
  }, [user, navigate]);

  return (
    <div className={styles.header} ref={ref}>
      <div className={styles.nav}>
        <div className={styles.navigation}>
          <button type="button" className={styles.title} onClick={() => navigate('/')}>
            <img src={`${process.env.PUBLIC_URL}/images/natch-avatar.png`} alt="Natch avatar" />
            <h1>Natch bot</h1>
          </button>
        </div>

        <div>
          {user.discordUser ? (
            <button type="button" className={styles.user} onClick={() => logout()}>
              <div className={styles.content}>
                {user.discordUser.avatar && (
                <img
                  src={`https://cdn.discordapp.com/avatars/${user.discordUser.id}/${user.discordUser.avatar}.${user.discordUser.avatar.startsWith('a_') ? 'gif' : 'png'}`}
                  alt={`avatar of ${user.discordUser.username}`}
                />
                )}

                <span>{user.discordUser.username}</span>
              </div>

              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          ) : (
            <a href={DISCORD_LOGIN_URL} className={styles.login}>
              Login
              <FontAwesomeIcon icon={faUser} />
            </a>
          )}
        </div>

      </div>
    </div>
  );
});
