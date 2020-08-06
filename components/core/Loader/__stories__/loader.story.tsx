import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';

import Loader, { Mode } from '../Loader';

import { LOADER_TEXT_MOCKS } from '../__mocks__/loader.mocks';

const stories = storiesOf('Loader', module);

const StyledLoaderWrapper = styled.div`
  display: flex;
`;

const modeOptions = {
  light: Mode.LIGHT,
  dark: Mode.DARK,
};

stories.add('Loader', () => (
  <StyledLoaderWrapper>
    <Loader
      text={text('button text', LOADER_TEXT_MOCKS)}
      mode={select('mode', modeOptions, modeOptions.dark)}
    />
  </StyledLoaderWrapper>
));
