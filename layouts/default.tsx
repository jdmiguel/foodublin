import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import { CDN_URL_STATIC_DIRECTORY } from '../helpers/utils';

type MainLayoutProps = {
  children: ReactNode;
  isExtendedHeader: boolean;
};

const StyledMainLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const StyledMain = styled.main`
  margin-bottom: 60px;
`;

const StyledFooter = styled(Footer)`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
`;

const MainLayout = ({ children, isExtendedHeader }: MainLayoutProps) => (
  <StyledMainLayout>
    <Header
      bgImgSrc={`${CDN_URL_STATIC_DIRECTORY}/images/food.jpg`}
      claimTxt="Discover the best food in Dublin"
      isExtended={isExtendedHeader}
    />
    <StyledMain>{children}</StyledMain>
    <StyledFooter />
  </StyledMainLayout>
);

export default MainLayout;
