import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { DefaultLayout } from '../../layouts';

import Filter from '../Filter/Filter';

import Title from '../core/Title/Title';
import Card from '../core/Card/Card';
import Loader, { Mode } from '../core/Loader/Loader';

import {
  FILTER_DATA,
  THUMB_GENERIC_SRC,
  DEFAULT_TEXT_LOADING,
} from '../../helpers/staticData';
import { getFormattedUrlText } from '../../helpers/utils';
import { RestaurantType } from '../../helpers/types';

type SearchPageProps = {
  location: string | undefined;
  cuisine: string | undefined;
  total: number;
  restaurants: RestaurantType[];
  onClickFilter: (sort: string, order: string) => void;
  onClickCard: () => void;
  isLoading: boolean;
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
  margin-bottom: ${({ warningShowed }) => (warningShowed ? '35px' : '60px')};
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
  opacity: ${({ isShowed }) => (isShowed ? '0.94' : '0')};
  background: ${(props) => props.theme.palette.LIGHT_MEDIUM};
  transition: opacity 0.2s ease 0s, transform 0.2s ease 0s;
  @media only screen and (min-width: 992px) {
    min-height: 200px;
  }
`;

const StyledLoader = styled(Loader)`
  position: fixed;
  top: 50vh;
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
  color: ${(props) => props.theme.palette.SECONDARY};
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
      showWarning,
    },
    forwardedRef,
  ) => {
    const titleTotalText = total > 0 ? total : 'There are no';
    const titleRestaurantText =
      total === 0 || total >= 2 ? 'restaurants' : 'restaurant';

    return (
      <DefaultLayout isExtendedHeader={false} isExtendedFooter={true}>
        <StyledSearchPage ref={forwardedRef} className="grid-container">
          <StyledLoaderWrapper isShowed={isLoading}>
            <StyledLoader text={DEFAULT_TEXT_LOADING} mode={Mode.DARK} />
          </StyledLoaderWrapper>
          <Title
            text={`${titleTotalText} ${
              cuisine || ''
            } ${titleRestaurantText} in ${location}`}
          />
          <Filter onClick={onClickFilter} data={FILTER_DATA} />
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
                  key={restaurant.id}
                  imgSrc={restaurant.imgSrc || THUMB_GENERIC_SRC}
                  title={restaurant.title}
                  route="/detail/[id]/[name]"
                  asRoute={`/detail/${restaurant.id}/${getFormattedUrlText(
                    restaurant.title,
                    true,
                  )}`}
                  firstText={restaurant.firstText}
                  onClick={onClickCard}
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
      </DefaultLayout>
    );
  },
);

SearchPage.displayName = 'SearchPage';

export default SearchPage;
