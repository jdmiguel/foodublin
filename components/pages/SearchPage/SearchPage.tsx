import React from 'react';

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
} from '@/store/statics';
import { getTitleText } from '@/helpers/utils';

import { Restaurant } from '../types';
import { LoaderType } from '../../core/types';

type SearchPageProps = {
  location: string | null;
  cuisine: string | null;
  total: number;
  restaurants: Restaurant[];
  onClickFilter: (sort: string, order: string) => void;
  onClickCard: (id: number, route: string, asRoute: string) => void;
  isLoadingByFilter: boolean;
  isLoadingByScroll: boolean;
  isNavigating: boolean;
  showWarning: boolean;
  onNavigate: () => void;
};

const SearchPage: React.FC<SearchPageProps> = ({
  total,
  location,
  cuisine,
  restaurants,
  onClickFilter,
  onClickCard,
  isLoadingByFilter,
  isLoadingByScroll,
  showWarning,
  isNavigating,
  onNavigate,
}) => {
  const { totalText, restaurantText } = getTitleText(total);

  return (
    <Layout
      isExtendedFooter={true}
      showFooterVeil={isLoadingByScroll}
      onNavigate={onNavigate}
    >
      <StyledSearchPage className="grid-container">
        <FullLoader isShowed={isLoadingByFilter}>
          <Loader text={DEFAULT_TEXT_LOADING} />
        </FullLoader>
        <FullLoader
          isShowed={isLoadingByScroll || isNavigating}
          type={LoaderType.LINE}
        >
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
              <Card
                imgSrc={restaurant.imgSrc || THUMB_GENERIC_SRC}
                title={restaurant.title}
                content={restaurant.content}
                onClick={() => {
                  onNavigate();
                  onClickCard(
                    restaurant.id,
                    restaurant.route,
                    restaurant.asRoute,
                  );
                }}
              />
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
};

export default SearchPage;
