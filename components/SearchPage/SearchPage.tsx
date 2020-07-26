import React from 'react';
import styled from 'styled-components';

import { DefaultLayout } from '../../layouts';

import Filter from '../Filter/Filter';

import Title from '../core/Title/Title';
import Card from '../core/Card/Card';

import { FILTER_DATA, THUMB_GENERIC_SRC } from '../../helpers/staticData';
import { RestaurantType } from '../../helpers/types';

type SearchPageProps = {
  location: string | undefined;
  cuisine: string | undefined;
  total: number;
  restaurants: RestaurantType[];
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
  @media only screen and (min-width: 640px) {
    justify-content: space-between;
  }
  @media only screen and (min-width: 768px) {
    justify-content: flex-start;
    margin-top: 35px;
  }
`;

const SearchPage = ({
  total,
  location,
  cuisine,
  restaurants,
}: SearchPageProps) => {
  const titleTotalText = total > 0 ? total : 'There are no';
  const titleRestaurantText =
    total === 0 || total >= 2 ? 'restaurants' : 'restaurant';

  return (
    <DefaultLayout isExtendedHeader={false} isExtendedFooter={true}>
      <StyledSearchPage className="grid-container">
        <Title
          text={`${titleTotalText} ${
            cuisine || ''
          } ${titleRestaurantText} in ${location}`}
        />
        <Filter
          onSelect={() => console.log('on filter select')}
          data={FILTER_DATA}
        />
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
