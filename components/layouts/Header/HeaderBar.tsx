import { Breadcrumbs } from '../../core/Breadcrumbs/Breadcrumbs';
import { CustomLink } from '../../core/CustomLink/CustomLink';
import { StyledHeaderBarWrapper, StyledHeaderBar } from './styles';
import { BreadcrumbsData } from '../../core/types';

type HeaderBarProps = {
  onClickBreadcrumb: (route: string, asRoute: string) => void;
  onClickFavorites: () => void;
  breadcrumbs: BreadcrumbsData[];
};

export const HeaderBar: React.FC<HeaderBarProps> = ({ onClickBreadcrumb, onClickFavorites, breadcrumbs }) => (
  <StyledHeaderBarWrapper data-testid="header-bar">
    <StyledHeaderBar className="grid-container">
    <Breadcrumbs breadcrumbsData={breadcrumbs || []} onClickBreadcrumb={onClickBreadcrumb} />
      <CustomLink onClick={onClickFavorites}>
        <i className="material-icons">bookmarks</i>FAVORITES
      </CustomLink>
    </StyledHeaderBar>
  </StyledHeaderBarWrapper>
);
