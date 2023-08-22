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
  StyledCornerWrapper,
  StyledHeaderClaim,
} from './styles';
import { Area, Cuisine } from '../../../helpers/types';
import { BreadcrumbsData } from '../../core/types';

type HeaderProps = {
  areas?: Area[];
  cuisines?: Cuisine[];
  bgImgSrc?: string | undefined;
  claimTxt: string;
  isExtended?: boolean;
  onNavigateFromFinder: (route: string, asRoute: string) => void;
  onClickLogo: () => void;
  onClickBreadcrumb: (route: string, asRoute: string) => void;
  onClickFavorites: () => void;
  breadcrumbs: BreadcrumbsData[];
};

export const Header: React.FC<HeaderProps> = ({
  areas,
  cuisines,
  bgImgSrc,
  claimTxt,
  isExtended = false,
  onClickLogo,
  onNavigateFromFinder,
  onClickBreadcrumb,
  onClickFavorites,
  breadcrumbs,
}) => (
  <StyledHeaderWrapper isExtended={isExtended}>
    <StyledHeader bgImg={bgImgSrc}>
      <StyledOverlay isExtended={isExtended}>
        <StyledHeaderContent isExtended={isExtended}>
          {isExtended && (
            <StyledCornerWrapper>
              <Corner />
            </StyledCornerWrapper>
          )}
          <CustomLink onClick={onClickLogo}>
            <Logo size={isExtended ? LogoSize.BIG : LogoSize.SMALL} logoSrc={'/images/logo.svg'} />
          </CustomLink>
          <StyledHeaderClaim isExtended={isExtended}>{claimTxt}</StyledHeaderClaim>
          {isExtended && areas && cuisines && (
            <Finder areas={areas} cuisines={cuisines} onNavigate={onNavigateFromFinder} />
          )}
        </StyledHeaderContent>
      </StyledOverlay>
    </StyledHeader>
    {!isExtended && (
      <HeaderBar
        onClickBreadcrumb={onClickBreadcrumb}
        onClickFavorites={onClickFavorites}
        breadcrumbs={breadcrumbs}
      />
    )}
  </StyledHeaderWrapper>
);
