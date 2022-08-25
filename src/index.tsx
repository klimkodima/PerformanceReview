import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './i18n';

import App from './App';
import store, { persistor } from './store';
import { injectStore } from './utils/api';

import './styles/index.scss';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement as HTMLElement);

injectStore(store);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
