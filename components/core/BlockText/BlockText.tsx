import React from 'react';

import { StyledBlockText } from './styles';

type BlockTextProps = {
  className?: string;
  text: string;
};

export const BlockText: React.FC<BlockTextProps> = ({ className, text }) => (
  <StyledBlockText className={className}>{text}</StyledBlockText>
);
