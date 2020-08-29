import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import detectBrowserLanguage from 'detect-browser-language';
import { I18nProvider } from '../i18n';
import MasterStyle from '../assets/styles/MasterStyle';

import VideoChat from '../pages/VideoChat';
import Categories from '../pages/categories/Categories';

const App = () => {
  const dispatch = useDispatch();
  const [language, setLang] = useState('en');
  useEffect(() => {
    const detectedLang = detectBrowserLanguage();
    if (detectedLang.includes('pl')) setLang('pl');
    else if (detectedLang.includes('de')) setLang('de');
    else if (detectedLang.includes('es')) setLang('es');
    else if (detectedLang.includes('fr')) setLang('fr');
    else setLang('en');

    dispatch({ type: 'ADD_LANG', lang: language });
  }, []);

  const categoriesPath = process.env.IS_DEV ? '/' : '/app';
  const videoChatPath = process.env.IS_DEV ? '/:category' : '/app/:category';

  return (
    <I18nProvider locale={language}>
      <MasterStyle>
        <Router>
          <Switch>
            <Route path={categoriesPath} exact component={Categories} />
            <Route path={videoChatPath} component={VideoChat} />
          </Switch>
        </Router>
      </MasterStyle>
    </I18nProvider>
  );
};

export default App;
