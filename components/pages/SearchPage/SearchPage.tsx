import React, { forwardRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Layout from '../../layouts/Layout';

import Filter from '../../ui/Filter/Filter';
import FullLoader from '../../ui/FullLoader/FullLoader';

import Loader from '../../core/Loader/Loader';
import Title from '../../core/Title/Title';
import Card from '../../core/Card/Card';

import {
  FILTER_DATA,
  THUMB_GENERIC_SRC,
  DEFAULT_TEXT_LOADING,
} from '../../../helpers/staticData';
import { Restaurant, LoaderType } from '../../../helpers/types';
import { getTitleText } from '../../../helpers/utils';

type SearchPageProps = {
  location: string | undefined;
  cuisine: string | undefined;
  total: number;
  restaurants: Restaurant[];
  onClickFilter: (sort: string, order: string) => void;
  onClickCard: (id: string) => void;
  isLoading: boolean;
  isLoadingByScroll: boolean;
  showWarning: boolean;
};

const StyledSearchPage = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  @media only screen and (min-width: 428px) {
    margin-bottom: 35px;
  }
  @media only screen and (min-width: 1024px) {
    margin-top: 60px;
    padding: 0 30px;
  }
`;

const StyledCardsWrapper = styled.div<{ warningShowed: boolean }>`
  margin-top: 20px;
  margin-bottom: ${({ warningShowed }) => (warningShowed ? '35px' : '40px')};
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

const StyledWarning = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  text-align: center;
  color: ${({ theme }) => theme.palette.SECONDARY};
  @media only screen and (min-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 70px;
  }
  @media only screen and (min-width: 992px) {
    flex-direction: row;
    text-align: left;
    margin-top: 40px;
    margin-bottom: 80px;
    font-size: 1.3rem;
  }
`;

const StyledWarningIcon = styled.i`
  font-size: 1.7rem;
  margin: 0 0 7px 0;
  @media only screen and (min-width: 992px) {
    margin: 0 5px 0 0;
  }
`;

const SearchPage = forwardRef<HTMLDivElement, SearchPageProps>(
  (
    {
      total,
      location,
      cuisine,
      restaurants,
      onClickFilter,
      onClickCard,
      isLoading,
      isLoadingByScroll,
      showWarning,
    },
    forwardedRef,
  ) => {
    const { totalText, restaurantText } = getTitleText(total);

    return isLoading ? (
      <FullLoader>
        <Loader text={DEFAULT_TEXT_LOADING} />
      </FullLoader>
    ) : (
      <Layout isExtendedFooter={true} showFooterVeil={isLoadingByScroll}>
        <StyledSearchPage ref={forwardedRef} className="grid-container">
          <FullLoader isShowed={isLoadingByScroll} type={LoaderType.LINE}>
            <Loader type={LoaderType.LINE} />
          </FullLoader>
          <Title
            text={`${totalText} ${
              cuisine || ''
            } ${restaurantText} in ${location}`}
          />
          {total > 0 && <Filter onClick={onClickFilter} data={FILTER_DATA} />}
          <StyledCardsWrapper
            className="grid-x grid-margin-x grid-margin-y"
            warningShowed={showWarning}
          >
            {restaurants.map((restaurant) => (
              <div
                className="cell small-12 medium-6 large-4"
                key={`${restaurant.id}-${restaurant.title}`}
              >
                <Link href={restaurant.route} as={restaurant.asRoute}>
                  <Card
                    imgSrc={restaurant.imgSrc || THUMB_GENERIC_SRC}
                    title={restaurant.title}
                    content={restaurant.content}
                    onClick={() => onClickCard(restaurant.id)}
                  />
                </Link>
              </div>
            ))}
          </StyledCardsWrapper>
          {showWarning && (
            <StyledWarning>
              <StyledWarningIcon className="material-icons">
                warning
              </StyledWarningIcon>
              You have reached the limit of 100 results because of Zomato API
              restrinctions
            </StyledWarning>
          )}
        </StyledSearchPage>
      </Layout>
    );
  },
);

SearchPage.displayName = 'SearchPage';

export default SearchPage;
