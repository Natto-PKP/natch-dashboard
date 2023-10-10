import { useState, useCallback } from 'react';
import { AlertContextInterface, IAlert } from '../contextes/AlertContext';

export function useAlerts() {
  const [alerts, setAlerts] = useState<IAlert[]>([]);

  const addAlert = useCallback((alert: IAlert) => {
    setAlerts((current) => {
      if (current.length >= 5) return [...current.slice(1), alert];
      return [...current, alert];
    });
  }, []);

  const removeAlert = useCallback((index: number) => {
    setAlerts((current) => current.filter((_, i) => i !== index));
  }, []);

  return {
    values: alerts,
    setAlerts,
    addAlert,
    removeAlert,
  } as AlertContextInterface;
}
