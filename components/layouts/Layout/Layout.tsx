import { useState, ReactNode } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Button } from '../../core/Button/Button';
import { useScroll } from '../../hooks/useScroll';
import { StyledLayout, StyledMain, StyledScrollUpButtonWrapper } from './styles';
import { BreadcrumbsData } from '../../core/types';
import { Area, Cuisine } from '../../pages/types';
import { SCROLL_DELAY, SHOWING_SCROLLUP_BUTTON_HEIGHT, DEFAULT_BREADCRUMB } from '@/store/statics';

type LayoutProps = {
  children: ReactNode;
  areas?: Area[];
  cuisines?: Cuisine[];
  isExtendedHeader?: boolean;
  showFooterVeil?: boolean;
  onNavigate: (route: string, asRoute?: string) => void;
  breadcrumbs?: BreadcrumbsData[];
};

export const Layout = ({
  children,
  areas,
  cuisines,
  isExtendedHeader = false,
  showFooterVeil = false,
  onNavigate,
  breadcrumbs,
}: LayoutProps) => {
  const [scrollUpButtonisShown, setScrollUpButtonisShown] = useState(false);

  useScroll(
    ({ scrollTop }) => {
      setScrollUpButtonisShown(scrollTop > SHOWING_SCROLLUP_BUTTON_HEIGHT);
    },
    [],
    SCROLL_DELAY,
  );

  const handleScrollUp = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <StyledLayout>
      <Header
        bgImgSrc="/images/food.jpg"
        claimTxt="Discover the best food in Dublin"
        isExtended={isExtendedHeader}
        onClickLogo={() => onNavigate('/')}
        breadcrumbs={breadcrumbs || [DEFAULT_BREADCRUMB]}
        onClickBreadcrumb={(route: string, asRoute: string) => onNavigate(route, asRoute)}
        onClickFavorites={() => onNavigate('/favorites')}
        onNavigateFromFinder={onNavigate}
        areas={areas}
        cuisines={cuisines}
      />
      <StyledMain>{children}</StyledMain>
      <Footer showVeil={showFooterVeil} onClickFavorites={() => onNavigate('/favorites')} />
      <StyledScrollUpButtonWrapper isShown={scrollUpButtonisShown}>
        <Button fullWidth={false} isFloating={true} onClick={handleScrollUp}>
          <i className="material-icons">arrow_upward</i>
        </Button>
      </StyledScrollUpButtonWrapper>
    </StyledLayout>
  );
};
