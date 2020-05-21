import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import detectBrowserLanguage from 'detect-browser-language';
import { I18nProvider } from '../../i18n';
import __t from '../../i18n/translator.js';
import MasterStyle from '../../assets/styles/MasterStyle.js';

import Home from '../home/Home.js';
import Categories from '../categories/Categories.js';

const App = () => {
  const dispatch = useDispatch();

  const overrideLang = () => {
    const lang = detectBrowserLanguage();
    if (lang === 'en-US') return 'en';
    else return lang;
  };

  useEffect(() => {
    dispatch({ type: 'ADD_LANG', lang: overrideLang() });
  }, []);

  return (
    <I18nProvider locale={overrideLang()}>
      <MasterStyle>
        <Router>
          <Switch>
            <Route path="/" exact component={Categories} />
            <Route path="/cat" exact component={Categories} />
          </Switch>
        </Router>
        From translator: {__t('lang')}
        <div> Lang detected: {detectBrowserLanguage()}</div>
        <div> Lang in state: {overrideLang()}</div>
      </MasterStyle>
    </I18nProvider>
  );
};

export default App;
