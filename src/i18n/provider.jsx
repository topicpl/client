import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import flatten from 'flat';
import { LOCALES } from './locales';
import locales from './locales/index';

const Provider = ({ children, locale = LOCALES.ENGLISH }) => (
  <IntlProvider
    locale={locale}
    textComponent={Fragment}
    messages={flatten(locales[locale])}
  >
    {children}
  </IntlProvider>
);

export default Provider;
