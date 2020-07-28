import React from 'react';
import styled from 'styled-components';

type BlockTitleProps = {
  className?: string;
  text: string;
};

const StyledBlockTitle = styled.h4`
  color: ${(props) => props.theme.palette.DARK_MEDIUM};
  font-size: 1.2rem;
  font-weight: 500;

  @media only screen and (min-width: 992px) {
    font-size: 1.45rem;
  }
`;

const BlockTitle: React.FC<BlockTitleProps> = ({ className, text }) => (
  <StyledBlockTitle className={className}>{text}</StyledBlockTitle>
);

export default BlockTitle;
