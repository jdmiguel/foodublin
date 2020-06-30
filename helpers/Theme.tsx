import React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

export const theme: DefaultTheme = {
  palette: {
    PRIMARY: '#EC7E00',
    PRIMARY_DARK: '#D48C24',
    PRIMARY_MEDIUM: '#FBA52B',
    PRIMARY_LIGHT: '#FDF3E5',
    SECONDARY: '#660000',
    LIGHT_MAX: '#FFFFFF',
    LIGHT_MEDIUM: '#F3F3F3',
    LIGHT_MIN: '#E5EAED',
    LIGHT_SOFT: '#D8D8D8',
    DARK_MAX: '#222C3C',
    DARK_MEDIUM: '#585858',
    DARK_MIN: '#89959B',
    DARK_SOFT: '#A7A7A7',
  },
};

export const renderWithTheme = (component: any) => (
  <ThemeProvider theme={theme}>{component}</ThemeProvider>
);
