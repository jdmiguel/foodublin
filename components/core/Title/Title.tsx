import React from 'react';
import styled from 'styled-components';

type TitleProps = {
  text: string;
};

const StyledTitle = styled.h3`
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette.DARK_MAX};
  margin-bottom: 35px;
  @media only screen and (min-width: 768px) {
    font-size: 2.3rem;
  }
  @media only screen and (min-width: 1024px) {
    text-align: left;
  }
`;

const Title: React.FC<TitleProps> = ({ text }) => (
  <StyledTitle>{text}</StyledTitle>
);

export default Title;
