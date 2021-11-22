import { Breadcrumbs } from '../../core/Breadcrumbs/Breadcrumbs';
import { CustomLink } from '../../core/CustomLink/CustomLink';
import { StyledFooterBarWrapper, StyledFooterBar } from './styles';
import { BreadcrumbsData } from '../../core/types';

type FooterBarProps = {
  onClickBreadcrumb: (route: string, asRoute: string) => void;
  onClickFavorites: () => void;
  breadcrumbs: BreadcrumbsData[];
};

export const FooterBar: React.FC<FooterBarProps> = ({
  onClickBreadcrumb,
  onClickFavorites,
  breadcrumbs,
}) => {
  return (
    <StyledFooterBarWrapper data-testid="footer-bar">
      <StyledFooterBar className="grid-container">
        <Breadcrumbs breadcrumbsData={breadcrumbs || []} onClickBreadcrumb={onClickBreadcrumb} />
        <CustomLink onClick={onClickFavorites}>
          <i className="material-icons">bookmarks</i>FAVORITES
        </CustomLink>
      </StyledFooterBar>
    </StyledFooterBarWrapper>
  );
};
