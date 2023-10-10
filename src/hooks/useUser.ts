import { useState } from 'react';
import { IApiUser, IDiscordUser } from '../contextes/UserContext';

export function useUser() {
  const [apiUser, setApiUser] = useState<IApiUser | null>(null);
  const [discordUser, setDiscordUser] = useState<IDiscordUser | null>(null);

  return {
    apiUser,
    setApiUser,
    discordUser,
    setDiscordUser,
  };
}
