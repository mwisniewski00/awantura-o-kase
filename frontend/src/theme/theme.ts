import { createTheme } from '@mui/material';
import type {} from '@mui/lab/themeAugmentation';

export const NAVBAR_BACKGROUND_COLOR = '#FFB703';

export const theme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        list: {
          '&[role="menu"]': {
            backgroundColor: NAVBAR_BACKGROUND_COLOR
          }
        }
      }
    },
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          '&[disabled]': {
            backgroundColor: 'rgba(255, 255, 255, 0.12)'
          }
        },
        loadingIndicator: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        text: {
          color: '#E6E6FA'
        },
        outlinedPrimary: {
          borderColor: 'white',
          color: 'white',
          '&:hover': {
            borderColor: '#dcdcdc',
            color: '#dcdcdc'
          }
        }
      }
    }
  },
  palette: {
    background: {
      paper: '#121212'
    },
    text: {
      primary: '#FFF',
      secondary: 'rgba(255, 255, 255, 0.7)'
    }
  }
});
