import React from 'react';
import styled from 'styled-components';

type TitleProps = {
  className?: string;
  text: string;
};

const StyledTitle = styled.h3`
  font-size: 1.8rem;
  line-height: 30px;
  font-weight: 500;
  color: ${(props) => props.theme.palette.DARK_MAX};
  margin-bottom: 35px;
  @media only screen and (min-width: 768px) {
    font-size: 2.3rem;
    line-height: 32px;
  }
`;

const Title: React.FC<TitleProps> = ({ className, text }) => (
  <StyledTitle className={className}>{text}</StyledTitle>
);

export default Title;
