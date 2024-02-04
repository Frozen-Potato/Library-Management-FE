import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './storeConfig/store';
import App from './App';

import { ThemeContextProvider } from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <CssBaseline/>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeContextProvider>
  </React.StrictMode>
);

