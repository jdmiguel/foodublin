import { StyledLogo, StyledImg } from './styles';
import { LogoSize } from '../types';

type LogoProps = {
  size: LogoSize.BIG | LogoSize.SMALL;
  logoSrc: string;
};

export const Logo: React.FC<LogoProps> = ({ size, logoSrc }) => (
  <StyledLogo size={size}>
    <StyledImg src={logoSrc} alt="FooDublin Logo" />
  </StyledLogo>
);
