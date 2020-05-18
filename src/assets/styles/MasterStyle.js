import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle.js';
import { theme } from './theme.js';

const MasterStyle = ({ children }) => (
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <>{children}</>
    </ThemeProvider>
  </>
);

export default MasterStyle;
