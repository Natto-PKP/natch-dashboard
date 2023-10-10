import { useContext, useEffect } from 'react';
import { UserManager } from '@natchy/natch-api-package-client';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contextes/UserContext';
import { AlertContext } from '../contextes/AlertContext';

import { client } from '../client';

interface Props {
  to: string;
}

export function useUserRefresh({ to }: Props = { to: '/' }) {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const alert = useContext(AlertContext);

  useEffect(() => {
    const refreshToken = localStorage.getItem('refresh_token');

    if (refreshToken) {
      client.refresh(refreshToken).then(async (res) => {
        const Authorization = `${res.tokenType} ${res.accessToken}`;
        const discordUser = await UserManager.getCurrentDiscordUser({ Authorization });
        const apiUser = await client.users.getMe({ Authorization });

        localStorage.setItem('access_token', res.accessToken);
        localStorage.setItem('token_type', res.tokenType);

        if (res.refreshToken) localStorage.setItem('refresh_token', res.refreshToken);
        else localStorage.removeItem('refresh_token');

        user.setApiUser(apiUser);
        user.setDiscordUser(discordUser);
        navigate(to);
      }).catch(async (err: Error | Response) => {
        if ('json' in err) {
          const json = await err.json();
          alert.addAlert({ message: json.message || 'An error occurred while refreshing your session.', type: 'error' });
        } else alert.addAlert({ message: 'An error occurred while refreshing your session.', type: 'error' });

        localStorage.removeItem('access_token');
        localStorage.removeItem('token_type');
        localStorage.removeItem('refresh_token');
        user.setApiUser(null);
        user.setDiscordUser(null);
        navigate(to);
      });
    }
  }, []);
}
