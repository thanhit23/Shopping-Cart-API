import React from 'react';
import ReactDOM from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import './css/index.css';
import AppComponent from './containers/App';
import reportWebVitals from './reportWebVitals';
import viMessages from './translations/vi.json';
import enMessages from './translations/en.json';
import store from './store';

const messages = {
  en: enMessages,
  vi: viMessages,
};
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <IntlProvider locale="en" defaultLocale="en" messages={messages.en}>
      <AppComponent />
    </IntlProvider>
  </Provider>,
);

reportWebVitals();
