import React from 'react';
import Routing from './Routing';
import TopBar from './components/Navigation/TopBar';
import { AuthProvider } from './providers/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import { NotificationsProvider } from '@toolpad/core/useNotifications';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NotificationsProvider>
        <BrowserRouter>
          <AuthProvider>
            <TopBar />
            <Routing />
          </AuthProvider>
        </BrowserRouter>
      </NotificationsProvider>
    </ThemeProvider>
  );
}
