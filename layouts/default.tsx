import React, { ReactNode } from 'react';
import styled from 'styled-components';

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

const MainLayout = ({ children }: MainLayoutProps) => (
  <StyledMainLayout>
    <StyledMain>{children}</StyledMain>
  </StyledMainLayout>
);

export default MainLayout;
