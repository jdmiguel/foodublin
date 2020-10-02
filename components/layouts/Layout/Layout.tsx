import React, { useState, ReactNode } from 'react';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

import { useScrollPosY } from '../../hooks/useScrollPosY';

import { StyledLayout, StyledMain, StyledScrollUpButton } from './styles';

import { CDN_URL_STATIC_DIRECTORY } from '../../../helpers/utils';
import {
  SCROLL_DELAY,
  SHOWING_SCROLLUP_BUTTON_HEIGHT,
} from '../../../helpers/staticData';

type LayoutProps = {
  children: ReactNode;
  isExtendedHeader?: boolean;
  isExtendedFooter?: boolean;
  showFooterVeil?: boolean;
};

export const Layout = ({
  children,
  isExtendedHeader = false,
  isExtendedFooter = false,
  showFooterVeil = false,
}: LayoutProps) => {
  const [scrollUpButtonIsShowed, setScrollUpButtonIsShowed] = useState(false);

  useScrollPosY(
    ({ posY }) => {
      setScrollUpButtonIsShowed(posY > SHOWING_SCROLLUP_BUTTON_HEIGHT);
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
        bgImgSrc={`${CDN_URL_STATIC_DIRECTORY}/images/food.jpg`}
        claimTxt="Discover the best food in Dublin"
        isExtended={isExtendedHeader}
      />
      <StyledMain>{children}</StyledMain>
      <Footer showVeil={showFooterVeil} isExtended={isExtendedFooter} />
      <StyledScrollUpButton
        fullWidth={false}
        isFloating={true}
        onClick={handleScrollUp}
        scrollUpButtonIsShowed={scrollUpButtonIsShowed}
        endValue={1}
      >
        <i className="material-icons">arrow_upward</i>
      </StyledScrollUpButton>
    </StyledLayout>
  );
};
