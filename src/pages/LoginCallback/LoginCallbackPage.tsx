import { useContext, useEffect } from 'react';
import { UserManager } from '@natchy/natch-api-package-client';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../contextes/UserContext';
import { AlertContext } from '../../contextes/AlertContext';
import { client } from '../../client';

import styles from './LoginCallbackPage.module.scss';
import { AuthService } from '../../services/AuthService';

export function LoginCallbackPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const alert = useContext(AlertContext);
  const user = useContext(UserContext);

  useEffect(() => {
    const fragments = new URLSearchParams(location.search);
    const code = fragments.get('code');

    if (code) {
      client.login({ code }).then(async (res) => {
        const Authorization = `${res.tokenType} ${res.accessToken}`;
        const discordUser = await UserManager.getCurrentDiscordUser({ Authorization });
        const apiUser = await client.users.getMe({ Authorization });

        AuthService.setAuthInLocalStorage(res);
        user.setApiUser(apiUser);
        user.setDiscordUser(discordUser);
        navigate('/');
      }).catch(async (err: Error) => {
        alert.addAlert({ message: err.message || 'An error occurred while creating your session.', type: 'error' });
        AuthService.clearAuthInLocalStorage();
        user.setApiUser(null);
        user.setDiscordUser(null);
        navigate('/');
      });
    } else {
      alert.addAlert({ message: 'An error occurred while creating your session.', type: 'error' });
      AuthService.clearAuthInLocalStorage();
      user.setApiUser(null);
      user.setDiscordUser(null);
      navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.body}>
      <FontAwesomeIcon icon={faSpinner} size="lg" spinPulse />
      <h1>Logging in...</h1>
    </div>
  );
}
