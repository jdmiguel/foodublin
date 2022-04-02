import React, { ReactNode } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

export const theme: DefaultTheme = {
  palette: {
    PRIMARY: '#EC7E00',
    PRIMARY_DARK: '#D48C24',
    PRIMARY_MEDIUM: '#FBA52B',
    PRIMARY_LIGHT: '#FDF3E5',
    LIGHT_MAX: '#FFFFFF',
    LIGHT_MEDIUM: '#F3F3F3',
    LIGHT_MIN: '#E5EAED',
    LIGHT_SOFT: '#D8D8D8',
    DARK_MAX: '#2f3235',
    DARK_MEDIUM: '#585858',
    DARK_MIN: '#798186',
    DARK_SOFT: '#A7A7A7',
    BLACK: '#171819',
  },
};

export const renderWithTheme = (component: ReactNode) => (
  <ThemeProvider theme={theme}>{component}</ThemeProvider>
);
