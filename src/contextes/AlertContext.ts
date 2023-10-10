import { createContext } from 'react';

export interface IAlert {
  message: string;
  type: 'error' | 'warning' | 'info' | 'success';
}

export interface AlertContextInterface {
  values: IAlert[];
  setAlerts: (alerts: IAlert[]) => void;
  addAlert: (alert: IAlert) => void;
  removeAlert: (index: number) => void;
}

export const AlertContextDefaultValue: AlertContextInterface = {
  values: [],
  setAlerts: () => {},
  addAlert: () => {},
  removeAlert: () => {},
};

export const AlertContext = createContext<AlertContextInterface>(AlertContextDefaultValue);
