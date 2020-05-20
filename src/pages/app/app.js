import React, { useState, useEffect } from 'react';
import MasterStyle from '../../assets/styles/MasterStyle.js';
import detectBrowserLanguage from 'detect-browser-language';

const App = () => {
  const [lang, setLang] = useState(0);

  useEffect(() => {
    setLang(detectBrowserLanguage());
  }, []);

  return (
    <MasterStyle>
      <div className="App">
        {lang}Welcome {__('type')}
      </div>
      <a href="/en">en</a> | <a href="/pl">pl</a> | <a href="/fr">fr</a> |
      <a href="/es">es</a> | <a href="/de">de</a> |
    </MasterStyle>
  );
};

export default App;
