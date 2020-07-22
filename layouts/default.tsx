import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import { CDN_URL_STATIC_DIRECTORY } from '../helpers/utils';

type MainLayoutProps = {
  children: ReactNode;
  isExtendedHeader: boolean;
  isExtendedFooter: boolean;
  onClickFavourites?: () => void;
  onClickBreadcrumbs?: (link: string) => void;
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

const MainLayout = ({
  children,
  isExtendedHeader,
  isExtendedFooter,
  onClickFavourites,
  onClickBreadcrumbs,
}: MainLayoutProps) => (
  <StyledMainLayout>
    <Header
      bgImgSrc={`${CDN_URL_STATIC_DIRECTORY}/images/food.jpg`}
      claimTxt="Discover the best food in Dublin"
      isExtended={isExtendedHeader}
    />
    <StyledMain>{children}</StyledMain>
    <Footer
      isExtended={isExtendedFooter}
      onClickFavourites={onClickFavourites}
      onClickBreadcrumbs={onClickBreadcrumbs}
    />
  </StyledMainLayout>
);

export default MainLayout;
