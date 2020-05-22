import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import flatten from 'flat';
import { LOCALES } from './locales.js';
import locales from './locales/index.js';

const Provider = ({ children, locale = LOCALES.ENGLISH }) => {
  return (
    <IntlProvider
      locale={locale}
      textComponent={Fragment}
      messages={flatten(locales[locale])}
    >
      {children}
    </IntlProvider>
  );
};

export default Provider;
