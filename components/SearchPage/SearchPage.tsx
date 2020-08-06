import React from 'react';
import styled from 'styled-components';

import { DefaultLayout } from '../../layouts';

import Filter from '../Filter/Filter';

import Title from '../core/Title/Title';
import Card from '../core/Card/Card';

import { FILTER_DATA, THUMB_GENERIC_SRC } from '../../helpers/staticData';
import { RestaurantType } from '../../helpers/types';
import { CDN_URL_STATIC_DIRECTORY } from '../../helpers/utils';

type SearchPageProps = {
  location: string | undefined;
  cuisine: string | undefined;
  total: number;
  restaurants: RestaurantType[];
  onClickFilter: (sort: string, order: string) => void;
  isLoading: boolean;
};

const StyledSearchPage = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  @media only screen and (min-width: 428px) {
    margin-bottom: 35px;
  }
  @media only screen and (min-width: 1024px) {
    margin-top: 75px;
    padding: 0 30px;
  }
`;

const StyledCardsWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 35px;
  display: flex;
  justify-content: center;
  position: initial;
  @media only screen and (min-width: 640px) {
    justify-content: space-between;
  }
  @media only screen and (min-width: 768px) {
    position: relative;
    justify-content: flex-start;
    margin-top: 35px;
  }
`;

const StyledLoaderWrapper = styled.div<{ isShowed: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  visibility: ${({ isShowed }) => (isShowed ? 'visible' : 'hidden')};
  opacity: ${({ isShowed }) => (isShowed ? '0.9' : '0')};
  background: ${(props) => props.theme.palette.LIGHT_MEDIUM};
  transition: opacity 0.2s ease 0s, transform 0.2s ease 0s;
  @media only screen and (min-width: 992px) {
    min-height: 200px;
  }
`;

const StyledLoader = styled.div`
  position: fixed;
  top: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-bottom: 8px;
  }
  p {
    font-size: 0.85rem;
  }
`;

const SearchPage = ({
  total,
  location,
  cuisine,
  restaurants,
  onClickFilter,
  isLoading,
}: SearchPageProps) => {
  const titleTotalText = total > 0 ? total : 'There are no';
  const titleRestaurantText =
    total === 0 || total >= 2 ? 'restaurants' : 'restaurant';

  return (
    <DefaultLayout isExtendedHeader={false} isExtendedFooter={true}>
      <StyledSearchPage className="grid-container">
        <StyledLoaderWrapper isShowed={isLoading}>
          <StyledLoader>
            <img
              src={`${CDN_URL_STATIC_DIRECTORY}/images/loader.svg`}
              alt="loader"
            />
            <p>Coming right up...</p>
          </StyledLoader>
        </StyledLoaderWrapper>
        <Title
          text={`${titleTotalText} ${
            cuisine || ''
          } ${titleRestaurantText} in ${location}`}
        />
        <Filter onClick={onClickFilter} data={FILTER_DATA} />
        <StyledCardsWrapper className="grid-x grid-margin-x grid-margin-y">
          {restaurants.map((restaurant) => (
            <div
              className="cell small-12 medium-6 large-4"
              key={`${restaurant.id}-${restaurant.title}`}
            >
              <Card
                key={restaurant.id}
                imgSrc={restaurant.imgSrc || THUMB_GENERIC_SRC}
                title={restaurant.title}
                route="/detail/[name]"
                asRoute={`/detail/${restaurant.link}`}
                firstText={restaurant.firstText}
              />
            </div>
          ))}
        </StyledCardsWrapper>
      </StyledSearchPage>
    </DefaultLayout>
  );
};

export default SearchPage;
