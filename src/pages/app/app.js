import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MasterStyle from '../../assets/styles/MasterStyle.js';
import detectBrowserLanguage from 'detect-browser-language';
import Home from '../home/Home.js';
import Categories from '../categories/Categories.js';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const lang = detectBrowserLanguage();
    const overrideLang = () => {
      if (lang === 'en-US') return 'en';
      else return 'pl';
    };

    dispatch({ type: 'ADD_LANG', lang: overrideLang() });
  }, []);

  return (
    <MasterStyle>
      <Router>
        <Route path="/:lang">
          <Route path="/" component={Home} />
          <Route path="/categories" component={Categories} />
        </Route>
      </Router>
      <div>
        {detectBrowserLanguage()}Welcome {__('lang')}
      </div>
      <a href="/en">en</a> | <a href="/pl">pl</a> | <a href="/fr">fr</a> |{' '}
      <a href="/es">es</a> | <a href="/de">de</a> |
    </MasterStyle>
  );
};

export default App;
