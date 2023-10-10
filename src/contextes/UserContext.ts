import { User } from '@natchy/natch-api-package-client';
import { createContext } from 'react';

export type IApiUser = User;

export type IDiscordUser = {
  id: string;
  username: string;
  discriminator: string;
  global_name?: string | null;
  avatar?: string | null;
  banner?: string | null;
  accent_color?: number | null;
};

export type UserContextType = {
  apiUser: IApiUser | null;
  setApiUser: (user: IApiUser | null) => void;
  discordUser: IDiscordUser | null;
  setDiscordUser: (user: IDiscordUser | null) => void;
};

export const UserContextDefaultValue: UserContextType = {
  apiUser: null,
  setApiUser: () => {},
  discordUser: null,
  setDiscordUser: () => {},
};

export const UserContext = createContext<UserContextType>(UserContextDefaultValue);
