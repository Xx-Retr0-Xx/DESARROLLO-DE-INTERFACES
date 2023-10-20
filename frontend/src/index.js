import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f17070',
      paper: '#a3cbff',
    },
    text: {
      primary: '#734a3e',
      secondary: '#212121',
      disabled: '#1b5e20',
    },
  },
  typography: {
    fontFamily: 'Oswald',
    fontSize: 10,
    fontWeightLight: 1000,
    fontWeightRegular: 100,
    h1: {
      fontFamily: 'Oswald',
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
  <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
</React.StrictMode>
);
