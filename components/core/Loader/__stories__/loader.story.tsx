import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import { Loader } from '../Loader';
import { LoaderType, LoaderMode } from '../../types';
import { LOADER_TEXT_MOCKS } from '../__mocks__/loader.mocks';

const stories = storiesOf('Loader', module);

const StyledCircleLoaderWrapper = styled.div`
  display: flex;
`;

const StyledLineLoaderWrapper = styled.div`
  display: flex;
`;

stories.add('Circle Loader', () => (
  <StyledCircleLoaderWrapper>
    <Loader
      text={text('button text', LOADER_TEXT_MOCKS)}
      mode={select('mode', LoaderMode, LoaderMode.DARK)}
    />
  </StyledCircleLoaderWrapper>
));

stories.add('Line Loader', () => (
  <StyledLineLoaderWrapper>
    <Loader type={LoaderType.LINE} />
  </StyledLineLoaderWrapper>
));
