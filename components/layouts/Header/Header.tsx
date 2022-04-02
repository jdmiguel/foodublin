import { CustomLink } from '../../core/CustomLink/CustomLink';
import { Logo } from '../../core/Logo/Logo';
import { Corner } from '../../core/Corner/Corner';
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
import { BreadcrumbsData } from '../../core/types';

type HeaderProps = {
  claimTxt: string;
  bgImgSrc?: string | undefined;
  isExtended?: boolean;
  onNavigationFromFinder: (route: string, asRoute: string) => void;
  onClickLogo: () => void;
  onClickBreadcrumb: (route: string, asRoute: string) => void;
  onClickFavorites: () => void;
  breadcrumbs: BreadcrumbsData[];
};

export const Header: React.FC<HeaderProps> = ({
  bgImgSrc,
  claimTxt,
  isExtended = false,
  onClickLogo,
  onNavigationFromFinder,
  onClickBreadcrumb,
  onClickFavorites,
  breadcrumbs
}) => {
  return (
    <StyledHeaderWrapper data-testid="header" isExtended={isExtended}>
      <StyledHeader bgImg={bgImgSrc}>
        <StyledOverlay isExtended={isExtended}>
          <StyledHeaderContent isExtended={isExtended}>
            {isExtended && <Corner />}
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
      {!isExtended && <HeaderBar onClickBreadcrumb={onClickBreadcrumb} onClickFavorites={onClickFavorites} breadcrumbs={breadcrumbs}/>}
    </StyledHeaderWrapper>
  );
};
