import React, { useState, ReactNode } from 'react';
import styled from 'styled-components';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Button from '../components/core/Button/Button';
import useScrollPosY from '../components/hooks/useScrollPosY';

import { CDN_URL_STATIC_DIRECTORY } from '../helpers/utils';
import {
  SCROLL_DELAY,
  SHOWING_SCROLLUP_BUTTON_HEIGHT,
} from '../helpers/staticData';
import { fadeAnimation } from '../helpers/animations';

type MainLayoutProps = {
  children: ReactNode;
  isExtendedHeader?: boolean;
  isExtendedFooter?: boolean;
  showFooterVeil?: boolean;
};

const StyledMainLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const StyledMain = styled.main`
  margin-bottom: 120px;
  padding: 0 10px;
  @media only screen and (min-width: 768px) {
    padding: 0 20px;
    margin-bottom: 80px;
  }
`;

const ScrollUpButton = styled(Button)<{ scrollUpButtonIsShowed: boolean }>`
  position: fixed;
  bottom: 1%;
  right: 4%;
  z-index: 1;
  display: ${({ scrollUpButtonIsShowed }) => !scrollUpButtonIsShowed && 'none'};
  ${fadeAnimation};
`;

const MainLayout = ({
  children,
  isExtendedHeader = false,
  isExtendedFooter = false,
  showFooterVeil = false,
}: MainLayoutProps) => {
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
    <StyledMainLayout>
      <Header
        bgImgSrc={`${CDN_URL_STATIC_DIRECTORY}/images/food.jpg`}
        claimTxt="Discover the best food in Dublin"
        isExtended={isExtendedHeader}
      />
      <StyledMain>{children}</StyledMain>
      <Footer showVeil={showFooterVeil} isExtended={isExtendedFooter} />
      <ScrollUpButton
        fullWidth={false}
        isFloating={true}
        onClick={handleScrollUp}
        scrollUpButtonIsShowed={scrollUpButtonIsShowed}
      >
        <i className="material-icons">arrow_upward</i>
      </ScrollUpButton>
    </StyledMainLayout>
  );
};

export default MainLayout;
