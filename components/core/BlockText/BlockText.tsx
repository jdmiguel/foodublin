import React from 'react';
import styled from 'styled-components';

type BlockTextProps = {
  className?: string;
  text: string;
};

const StyledBlockText = styled.p`
  color: ${({ theme }) => theme.palette.DARK_MEDIUM};
  line-height: 1.2rem;
`;

export const BlockText: React.FC<BlockTextProps> = ({ className, text }) => (
  <StyledBlockText className={className}>{text}</StyledBlockText>
);
