import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { PercentBar } from '../PercentBar';
import { PERCENTS_MOCK, LEGEND_MOCK } from '../__mocks__/percentBar.mocks';

const stories = storiesOf('PercentBar', module);

const StyledPercentBarWrapper = styled.div`
  width: 200px;
`;

stories.add('PercentBar', () => (
  <StyledPercentBarWrapper>
    <PercentBar percent={select('percent', PERCENTS_MOCK, PERCENTS_MOCK[0])} legend={LEGEND_MOCK} />
  </StyledPercentBarWrapper>
));
