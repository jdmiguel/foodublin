import { ReactNode } from 'react';
import { StyledFullLoaderWrapper } from './styles';
import { LoaderType } from '../../core/types';

type FullLoaderProps = {
  isShown?: boolean;
  children: ReactNode;
  type?: LoaderType.CIRCLE | LoaderType.LINE;
};

export const FullLoader: React.FC<FullLoaderProps> = ({
  isShown = true,
  children,
  type = LoaderType.CIRCLE,
}) => (
  <StyledFullLoaderWrapper isShown={isShown} type={type}>
    {children}
  </StyledFullLoaderWrapper>
);
