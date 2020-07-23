import React from 'react';
import styled from 'styled-components';

import { DefaultLayout } from '../../layouts';

import Filter from '../Filter/Filter';
import Title from '../core/Title/Title';
import Card from '../core/Card/Card';
import { FILTER_DATA } from '../../helpers/staticData';
import { RESTAURANTS } from './__mocks__/searchpage.mocks';

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

const SearchPage: React.FC = () => (
  <DefaultLayout isExtendedHeader={false} isExtendedFooter={true}>
    <StyledSearchPage className="grid-container">
      <Title text="32 restaurants in Rathmines" />
      <Filter
        onSelect={() => console.log('on filter select')}
        data={FILTER_DATA}
      />
      <StyledCardsWrapper className="grid-x grid-margin-x grid-margin-y">
        {RESTAURANTS.map((restaurant) => (
          <Card
            className="cell small-12 medium-6 large-4"
            key={restaurant.id}
            imgSrc={restaurant.imgSrc}
            imgAlt={restaurant.imgAlt}
            link={restaurant.link}
            title={restaurant.title}
            firstText={restaurant.firstText}
            secondText={restaurant.secondText}
          />
        ))}
      </StyledCardsWrapper>
    </StyledSearchPage>
  </DefaultLayout>
);

export default SearchPage;
