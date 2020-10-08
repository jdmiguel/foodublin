import React from 'react';
import Link from 'next/link';

import { Layout } from '../../layouts/Layout/Layout';

import { FullLoader } from '../../ui/FullLoader/FullLoader';

import { Loader } from '../../core/Loader/Loader';
import { Title } from '../../core/Title/Title';
import { Card } from '../../core/Card/Card';

import { StyledFavoritesPage, StyledCardsWrapper } from './styles';

import {
  DEFAULT_TEXT_LOADING,
  THUMB_GENERIC_SRC,
} from '../../../helpers/staticData';
import { Restaurant } from '../../../helpers/types';
import { getTitleText } from '../../../helpers/utils';

type FavoritesPageProps = {
  isLoading: boolean;
  total: number;
  restaurants: Restaurant[];
  clickRestaurant: () => void;
};

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  isLoading,
  total,
  restaurants,
  clickRestaurant,
}) => {
  const { totalText, restaurantText } = getTitleText(total);

  return isLoading ? (
    <FullLoader>
      <Loader text={DEFAULT_TEXT_LOADING} />
    </FullLoader>
  ) : (
    <Layout isExtendedFooter={true}>
      <StyledFavoritesPage className="grid-container">
        <Title
          text={`${totalText} ${restaurantText} saved in your favorites`}
        />
        <StyledCardsWrapper className="grid-x grid-margin-x grid-margin-y">
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
                  onClick={clickRestaurant}
                />
              </Link>
            </div>
          ))}
        </StyledCardsWrapper>
      </StyledFavoritesPage>
    </Layout>
  );
};

FavoritesPage.displayName = 'FavoritesPage';
