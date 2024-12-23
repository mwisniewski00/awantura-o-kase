import { Paper, Snackbar } from '@mui/material';
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';
import styled from 'styled-components';

interface GameNotificationContext {
  showNotification: (text: string, type?: NOTIFICATION_TYPE) => void;
}

const GameNotificationContext = createContext<GameNotificationContext | null>(null);

const NotificationContainer = styled(Paper)<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  width: 100%;
  height: 100%;
  height: 40px;
  padding-inline: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export enum NOTIFICATION_TYPE {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL'
}

const NOTIFICATION_COLORS: Record<NOTIFICATION_TYPE, string> = {
  [NOTIFICATION_TYPE.SUCCESS]: 'green',
  [NOTIFICATION_TYPE.FAIL]: 'red'
};

export function GameNotificationsProvider({ children }: PropsWithChildren<object>) {
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState('');
  const [notificationType, setNotificationType] = useState(NOTIFICATION_TYPE.SUCCESS);

  const onNotificationTrigger = useCallback((text: string, type = NOTIFICATION_TYPE.SUCCESS) => {
    setMessage(text);
    setNotificationType(type);
    setShowNotification(true);
  }, []);

  const onClose = () => {
    setShowNotification(false);
  };

  const contextValue = useMemo(
    () => ({ showNotification: onNotificationTrigger }),
    [onNotificationTrigger]
  );

  return (
    <GameNotificationContext.Provider value={contextValue}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showNotification}
        onClose={onClose}
        autoHideDuration={5000}>
        <NotificationContainer backgroundColor={NOTIFICATION_COLORS[notificationType]}>
          {message}
        </NotificationContainer>
      </Snackbar>
      {children}
    </GameNotificationContext.Provider>
  );
}

export function useGameNotifications() {
  const contextValue = useContext(GameNotificationContext);
  if (contextValue === null) {
    throw new Error(
      'Game notifications context value is missing. Probably context was not initialized.'
    );
  }
  return contextValue;
}
