import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MasterStyle from '../../assets/styles/MasterStyle.js';
import detectBrowserLanguage from 'detect-browser-language';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'ADD_LANG', lang: detectBrowserLanguage() });
  }, []);

  return (
    <MasterStyle>
      <div className="App">Welcome {__('type')}</div>
      <a href="/en">en</a> | <a href="/pl">pl</a> | <a href="/fr">fr</a> |
      <a href="/es">es</a> | <a href="/de">de</a> |
    </MasterStyle>
  );
};

export default App;
