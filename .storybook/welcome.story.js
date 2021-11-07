import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

const StyledTitle = styled.h1`
  color: ${props => props.theme.palette.DARK_MAX};
  font-weight: 600;
  font-size: 2rem;
`;

storiesOf('Welcome', module).add('to fooDublin Storybook 🎉', () => (
  <StyledTitle>Welcome to fooDublin Storybook</StyledTitle>
));
