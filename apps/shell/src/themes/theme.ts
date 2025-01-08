import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffe600',
      contrastText: '#000000',
    },
    secondary: {
      main: '#000000',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ffa000',
    },
    success: {
      main: '#388e3c',
    },
    info: {
      main: '#1976d2',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#0000008c'
    },
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
