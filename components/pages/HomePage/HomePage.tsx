import React from 'react';
import styled from 'styled-components';

import Layout from '../../../layouts/Layout';

import Loader from '../../core/Loader/Loader';
import Title from '../../core/Title/Title';
import Card, { CardType } from '../../core/Card/Card';

import {
  HIGHLIGHTED_RESTAURANTS,
  DEFAULT_TEXT_LOADING,
} from '../../../helpers/staticData';
import { Restaurant } from '../../../helpers/types';

type HomePageProps = {
  isLoading: boolean;
  highlights: Restaurant[];
  onClickHighlightCard: (id: string) => void;
};

const StyledLoaderWrapper = styled.div<{ isShowed: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  visibility: ${({ isShowed }) => (isShowed ? 'visible' : 'hidden')};
  opacity: ${({ isShowed }) => (isShowed ? '0.94' : '0')};
  background: ${(props) => props.theme.palette.LIGHT_MEDIUM};
  transition: opacity 0.2s ease 0s, transform 0.2s ease 0s;
  @media only screen and (min-width: 992px) {
    min-height: 200px;
  }
`;

const StyledLoader = styled(Loader)`
  position: absolute;
  top: 50vh;
`;

const StyledHighlights = styled.div`
  margin-top: 50px;
  margin-bottom: 60px;
  @media only screen and (min-width: 1024px) {
    margin-top: 75px;
    padding: 0 30px;
  }
`;

const StyledHighlightWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media only screen and (min-width: 1200px) {
    justify-content: space-between;
  }
`;

const HomePage: React.FC<HomePageProps> = ({
  isLoading,
  onClickHighlightCard,
}) => (
  <Layout isExtendedHeader={true} isExtendedFooter={true}>
    <StyledLoaderWrapper isShowed={isLoading}>
      <StyledLoader text={DEFAULT_TEXT_LOADING} />
    </StyledLoaderWrapper>
    <StyledHighlights className="grid-container">
      <Title text="Featured restaurants" />
      <StyledHighlightWrapper className="grid-x grid-margin-x grid-margin-y">
        {HIGHLIGHTED_RESTAURANTS.map((restaurant) => (
          <div key={restaurant.id} className="cell small-12 medium-6 large-4">
            <Card
              id={restaurant.id}
              imgSrc={restaurant.imgSrc}
              title={restaurant.title}
              content={restaurant.content}
              route={restaurant.route}
              asRoute={restaurant.asRoute}
              type={CardType.HIGHLIGHT}
              onClick={() => onClickHighlightCard(restaurant.id)}
            />
          </div>
        ))}
      </StyledHighlightWrapper>
    </StyledHighlights>
  </Layout>
);

export default HomePage;
