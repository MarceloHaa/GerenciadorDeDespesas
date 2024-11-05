import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './styles/global';
import Routering from './Routes/routes';
import { ThemeProvider } from './Contexts/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <GlobalStyle />
            <Routering />
        </ThemeProvider>
    </React.StrictMode>
);
