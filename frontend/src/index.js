import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/**
CssBaseline: es un componente que no muestra nada en pantalla. Lo que hace es la normalización
CSS, que es que diferentes elementos se vean igual en diferentes navegadores. Los diferentes
navegadores web tienen diferentes settings por defecto para cosas como el margen o el padding, así
que la aplicación web se verá ligeramente diferentes entre navegadores. El CssBaseline soluciona
eso.
 */


/**
 * AITOR SÁNCHEZ JIMÉNEZ
 */

    const theme = createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#09e2ca',
          },
          secondary: {
            main: '#e893ff',
          },
          text: {
            secondary: '#000000',
            disabled: 'rgba(0,0,0,0.38)',
            primary: 'rgba(0,0,0,0.87)',
          },
          background: {
            default: '#FFFFF',
          },
        },
        typography: {
          h1: {
            fontFamily: 'Raleway',
          },
          h2: {
            fontFamily: 'Slabo 27px',
          },
          h3: {
            fontFamily: 'Roboto',
          },
          h5: {
            fontFamily: 'Droid Serif',
          },
          h4: {
            fontFamily: 'Oswald',
          },
          subtitle1: {
            fontFamily: 'Source Sans Pro',
          },
          body1: {
            fontFamily: 'Slabo 27px',
          },
          body2: {
            fontFamily: 'PT Sans',
          },
        },

    });

    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
    </React.StrictMode>
    );
