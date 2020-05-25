import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import detectBrowserLanguage from 'detect-browser-language';
import { I18nProvider } from '../i18n';
import MasterStyle from '../assets/styles/MasterStyle';

import VideoChat from '../pages/VideoChat';
import Categories from '../pages/categories/Categories';

const App = () => {
  const dispatch = useDispatch();

  const overrideLang = () => {
    const lang = detectBrowserLanguage();
    if (lang === 'en-US') return 'en';
    return lang;
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
            <Route path="/:category" component={VideoChat} />
          </Switch>
        </Router>
      </MasterStyle>
    </I18nProvider>
  );
};

export default App;
