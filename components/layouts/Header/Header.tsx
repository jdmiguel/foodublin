import { CustomLink } from '../../core/CustomLink/CustomLink';
import { Logo } from '../../core/Logo/Logo';
import { LogoSize } from '../../core/types';
import { Finder } from '../../ui/Finder/Finder';
import { HeaderBar } from './HeaderBar';
import {
  StyledHeaderWrapper,
  StyledHeader,
  StyledOverlay,
  StyledHeaderContent,
  StyledHeaderClaim,
} from './styles';

type HeaderProps = {
  claimTxt: string;
  bgImgSrc?: string | undefined;
  isExtended?: boolean;
  onNavigationFromFinder: (route: string, asRoute: string) => void;
  onClickLogo: () => void;
  onClickFavorites: () => void;
  onClickBack: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  bgImgSrc,
  claimTxt,
  isExtended = false,
  onClickLogo,
  onNavigationFromFinder,
  onClickBack,
  onClickFavorites,
}) => {
  return (
    <StyledHeaderWrapper data-testid="header" isExtended={isExtended}>
      <StyledHeader bgImg={bgImgSrc}>
        <StyledOverlay isExtended={isExtended}>
          <StyledHeaderContent isExtended={isExtended}>
            <CustomLink onClick={onClickLogo}>
              <Logo
                size={isExtended ? LogoSize.BIG : LogoSize.SMALL}
                logoSrc={'/images/logo.svg'}
              />
            </CustomLink>
            <StyledHeaderClaim isExtended={isExtended}>{claimTxt}</StyledHeaderClaim>
            {isExtended && <Finder onNavigation={onNavigationFromFinder} />}
          </StyledHeaderContent>
        </StyledOverlay>
      </StyledHeader>
      {!isExtended && <HeaderBar onClickBack={onClickBack} onClickFavorites={onClickFavorites} />}
    </StyledHeaderWrapper>
  );
};
