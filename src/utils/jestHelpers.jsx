
import React from 'react';
import { ThemeProvider } from 'styled-components';
import renderer from 'react-test-renderer';
import { theme } from '../assets/styles/theme';

export const mountWithTheme = (children) => renderer.create(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
