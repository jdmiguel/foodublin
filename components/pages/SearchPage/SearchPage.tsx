import React, { forwardRef } from 'react';
import Link from 'next/link';

import { Layout } from '../../layouts/Layout/Layout';

import { Filter } from '../../ui/Filter/Filter';
import { FullLoader } from '../../ui/FullLoader/FullLoader';

import { Loader } from '../../core/Loader/Loader';
import { Title } from '../../core/Title/Title';
import { Card } from '../../core/Card/Card';

import {
  StyledSearchPage,
  StyledCardsWrapper,
  StyledWarning,
  StyledWarningIcon,
} from './styles';

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

export const SearchPage = forwardRef<HTMLDivElement, SearchPageProps>(
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
