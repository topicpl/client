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

  const detectLang = () => {
    const detectedLang = detectBrowserLanguage();
    if (detectedLang.includes('pl')) return 'pl';
    if (detectedLang.includes('de')) return 'de';
    if (detectedLang.includes('es')) return 'es';
    if (detectedLang.includes('fr')) return 'fr';
    return 'en';
  };
  useEffect(() => {
    dispatch({ type: 'ADD_LANG', lang: detectLang() });
  }, []);

  return (
    <I18nProvider locale={detectLang()}>
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
