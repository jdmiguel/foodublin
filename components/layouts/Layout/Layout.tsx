import React, { useState, ReactNode } from 'react';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

import { useScroll } from '../../hooks/useScroll';

import { StyledLayout, StyledMain, StyledScrollUpButton } from './styles';

import { BreadcrumbsData } from '../../core/types';

import {
  SCROLL_DELAY,
  SHOWING_SCROLLUP_BUTTON_HEIGHT,
  DEFAULT_BREADCRUMB,
} from '@/store/statics';

type LayoutProps = {
  children: ReactNode;
  isExtendedHeader?: boolean;
  isExtendedFooter?: boolean;
  showFooterVeil?: boolean;
  onNavigate: (route: string, asRoute?: string) => void;
  breadcrumbs?: BreadcrumbsData[];
};

export const Layout = ({
  children,
  isExtendedHeader = false,
  isExtendedFooter = false,
  showFooterVeil = false,
  onNavigate,
  breadcrumbs,
}: LayoutProps) => {
  const [scrollUpButtonIsShowed, setScrollUpButtonIsShowed] = useState(false);

  const backNavigation = breadcrumbs
    ? breadcrumbs[breadcrumbs.length - 2]
    : DEFAULT_BREADCRUMB;

  useScroll(
    ({ scrollTop }) => {
      setScrollUpButtonIsShowed(scrollTop > SHOWING_SCROLLUP_BUTTON_HEIGHT);
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
        onClickFavorites={() => onNavigate('/favorites')}
        onClickBack={() =>
          onNavigate(backNavigation.route, backNavigation.asRoute)
        }
        onNavigationFromFinder={onNavigate}
      />
      <StyledMain>{children}</StyledMain>
      <Footer
        showVeil={showFooterVeil}
        isExtended={isExtendedFooter}
        breadcrumbs={breadcrumbs || [DEFAULT_BREADCRUMB]}
        onClickBreadcrumb={(route: string, asRoute: string) =>
          onNavigate(route, asRoute)
        }
        onClickFavorites={() => onNavigate('/favorites')}
      />
      <StyledScrollUpButton
        fullWidth={false}
        isFloating={true}
        onClick={handleScrollUp}
        scrollUpButtonIsShowed={scrollUpButtonIsShowed}
      >
        <i className="material-icons">arrow_upward</i>
      </StyledScrollUpButton>
    </StyledLayout>
  );
};
