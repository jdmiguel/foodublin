import React, { useState, ReactNode } from 'react';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

import { useScroll } from '../../hooks/useScroll';

import { StyledLayout, StyledMain, StyledScrollUpButton } from './styles';

import { SCROLL_DELAY, SHOWING_SCROLLUP_BUTTON_HEIGHT } from '@/store/statics';

type LayoutProps = {
  children: ReactNode;
  isExtendedHeader?: boolean;
  isExtendedFooter?: boolean;
  showFooterVeil?: boolean;
  onNavigate: (route: string, asRoute?: string) => void;
};

export const Layout = ({
  children,
  isExtendedHeader = false,
  isExtendedFooter = false,
  showFooterVeil = false,
  onNavigate,
}: LayoutProps) => {
  const [scrollUpButtonIsShowed, setScrollUpButtonIsShowed] = useState(false);

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
        onClickBack={(route: string, asRoute: string) =>
          onNavigate(route, asRoute)
        }
        onNavigationFromFinder={onNavigate}
      />
      <StyledMain>{children}</StyledMain>
      <Footer
        showVeil={showFooterVeil}
        isExtended={isExtendedFooter}
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
