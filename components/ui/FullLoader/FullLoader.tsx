import { ReactNode } from 'react';
import { StyledFullLoaderWrapper } from './styles';
import { LoaderType } from '../../core/types';

type FullLoaderProps = {
  isShowed?: boolean;
  children: ReactNode;
  type?: LoaderType.CIRCLE | LoaderType.LINE;
};

export const FullLoader: React.FC<FullLoaderProps> = ({
  isShowed = true,
  children,
  type = LoaderType.CIRCLE,
}) => (
  <StyledFullLoaderWrapper isShowed={isShowed} type={type}>
    {children}
  </StyledFullLoaderWrapper>
);
