import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faCircleExclamation, faCircleInfo, faTriangleExclamation, faXmark,
} from '@fortawesome/free-solid-svg-icons';
import styles from './App.module.scss';
import './styles/global.scss';

import { HomePage } from './pages/Home/HomePage';
import { UserContext } from './contextes/UserContext';
import { LoginCallbackPage } from './pages/LoginCallback/LoginCallbackPage';
import { AlertContext } from './contextes/AlertContext';
import { useAlerts } from './hooks/useAlerts';
import { useUser } from './hooks/useUser';
import { DashboardComponent } from './pages/Dashboard/DashboardComponent';

export function App() {
  const user = useUser();
  const alerts = useAlerts();

  useEffect(() => {
    alerts.addAlert({ type: 'warning', message: 'This website is still in development, please be patient.' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.app}>
      <AlertContext.Provider value={alerts}>
        <UserContext.Provider value={user}>
          {Boolean(alerts.values.length) && (
            <div className={styles.alerts}>
              {alerts.values.map((alert, alertIndex) => (
                <button
                  type="button"
                  key={Math.ceil(Date.now() * Math.random())}
                  className={`${styles.alert} ${styles[alert.type]}`}
                  onClick={() => alerts.removeAlert(alertIndex)}
                >
                  <div className={styles.content}>
                    {alert.type === 'error' && <FontAwesomeIcon icon={faCircleExclamation} />}
                    {alert.type === 'warning' && <FontAwesomeIcon icon={faTriangleExclamation} />}
                    {alert.type === 'info' && <FontAwesomeIcon icon={faCircleInfo} />}
                    {alert.type === 'success' && <FontAwesomeIcon icon={faCircleCheck} />}
                    <span>{alert.message}</span>
                  </div>

                  <FontAwesomeIcon className={styles.remove} icon={faXmark} />
                </button>
              ))}
            </div>
          )}

          <BrowserRouter>
            <Routes>
              <Route index path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardComponent />} />
              <Route path="/login/callback" element={<LoginCallbackPage />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AlertContext.Provider>
    </div>
  );
}
