import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import detectBrowserLanguage from 'detect-browser-language';
import { I18nProvider } from '../../i18n';
import MasterStyle from '../../assets/styles/MasterStyle';

import Home from '../home/Home';
import Video from '../Video';
import Categories from '../categories/Categories';

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
            <Route path="/test" exact component={Home} />
            <Route path="/:category" component={Video} />
          </Switch>
        </Router>
      </MasterStyle>
    </I18nProvider>
  );
};

export default App;
