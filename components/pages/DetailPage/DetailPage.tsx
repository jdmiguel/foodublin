import React, { useState, useEffect } from 'react';
import { LazyImage } from 'react-lazy-images';

import { Layout } from '../../layouts/Layout/Layout';

import { FullLoader } from '../../ui/FullLoader/FullLoader';

import { Loader } from '../../core/Loader/Loader';
import { Title } from '../../core/Title/Title';
import { BlockText } from '../../core/BlockText/BlockText';
import { BlockTitle } from '../../core/BlockTitle/BlockTitle';
import { Rating } from '../../core/Rating/Rating';
import { Button } from '../../core/Button/Button';

import { Timmings } from './Timings';
import { Cuisines } from './Cuisines';
import { Highlights } from './Highlights';
import { Address } from './Address';
import { RelatedRestaurants } from './RelatedRestaurants';
import { ReviewCard } from '../../ui/ReviewCard/ReviewCard';

import {
  StyledOverlay,
  StyledName,
  StyledLocation,
  StyledButtonWrapper,
  StyledHeader,
  StyledDetailPage,
  StyledInformation,
  StyledSectionBlock,
  StyledTitleWrapper,
  StyledReviewsWrapper,
  StyledAddressWrapper,
  StyledPhone,
  StyledRelatedRestaurants,
} from './styles';

import { getFormattedUrlText } from '@/helpers/utils';
import { DETAIL_GENERIC_SRC, DEFAULT_TEXT_LOADING } from '@/store/statics';

import { LoaderType, BreadcrumbsData } from '../../core/types';
import { RestaurantDetail, Restaurant, Review, Timming } from '../types';

type DetailPageProps = {
  detail: RestaurantDetail;
  relatedRestaurants: Restaurant[];
  reviews: Review[] | null;
  isFavorite: boolean;
  isNavigating: boolean;
  onClickSaveButton: (action: string) => void;
  onClickRelatedRestaurant: (route: string, asRoute: string) => void;
  onNavigate: (route: string, asRoute?: string) => void;
  breadcrumbs: BreadcrumbsData[];
};

export const getTimmings = (timmingsStr: string) =>
  timmingsStr.split(',').reduce((acc: Timming[], next: string) => {
    const firstDayIndex = next.indexOf('(');
    const lastDayIndex = next.indexOf(')');

    if (next.includes('(') && next.includes(')')) {
      acc.push({
        id: next,
        day: next.slice(firstDayIndex + 1, lastDayIndex),
        schedule: next.slice(0, firstDayIndex - 1),
      });
    }

    return acc;
  }, []);

export const getMapSrc = (name: string, location: string) => {
  const urlName = getFormattedUrlText(name);
  const urlLocation = getFormattedUrlText(location);

  return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_EMBED_KEY}&q=${urlName}-${urlLocation},Dublin&zoom=16`;
};

const DetailPage: React.FC<DetailPageProps> = ({
  detail: {
    imgSrc,
    name,
    location,
    cuisines,
    timings,
    rating,
    votes,
    average,
    establishment,
    highlights,
    phone,
    address,
  },
  reviews,
  isFavorite,
  relatedRestaurants,
  onClickSaveButton,
  onClickRelatedRestaurant,
  onNavigate,
  isNavigating,
  breadcrumbs,
}) => {
  const [isSaved, setIsSaved] = useState(isFavorite);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setIsloading(false);
  }, []);

  const cuisinesList = cuisines.split(',');

  const clickSaveButton = () => {
    setIsSaved((isSaved) => !isSaved);
    onClickSaveButton(isFavorite ? 'unsave' : 'save');
  };

  const getStyledHeader = (ref: any, imgSrc: string) => (
    <StyledHeader data-testid="detail-header" ref={ref} bgImg={imgSrc}>
      <StyledOverlay>
        <StyledName>{name}</StyledName>
        <StyledLocation>{location}</StyledLocation>
        {isLoading ? (
          <StyledButtonWrapper>
            <Button onClick={clickSaveButton}>{DEFAULT_TEXT_LOADING}</Button>
          </StyledButtonWrapper>
        ) : (
          <StyledButtonWrapper>
            {' '}
            <Button onClick={clickSaveButton}>
              <i className="material-icons">{`${
                isSaved ? 'favorite' : 'favorite_border'
              }`}</i>
              {`${isSaved ? 'saved' : 'unsaved'}`}
            </Button>
          </StyledButtonWrapper>
        )}
      </StyledOverlay>
    </StyledHeader>
  );

  const getHeader = (imgSrc: string) => {
    if (imgSrc) {
      return (
        <LazyImage
          src={imgSrc}
          placeholder={({ ref }) => getStyledHeader(ref, DETAIL_GENERIC_SRC)}
          actual={({ imageProps }) => getStyledHeader(null, imageProps.src)}
        />
      );
    }

    return getStyledHeader(null, DETAIL_GENERIC_SRC);
  };

  return (
    <Layout
      isExtendedFooter={true}
      onNavigate={onNavigate}
      breadcrumbs={breadcrumbs}
    >
      <StyledDetailPage data-testid="detail-page" className="grid-container">
        <FullLoader isShowed={isNavigating} type={LoaderType.LINE}>
          <Loader type={LoaderType.LINE} />
        </FullLoader>
        {getHeader(imgSrc)}
        <StyledInformation>
          <Title text="Relevant information" />
          <div className="grid-x">
            <div className="grid-x cell small-12 large-7">
              <div className="cell small-12 medium-6">
                <StyledSectionBlock>
                  <StyledTitleWrapper>
                    <BlockTitle text="Cuisines" />
                  </StyledTitleWrapper>
                  <Cuisines cuisines={cuisinesList} />
                </StyledSectionBlock>
                <StyledSectionBlock>
                  <StyledTitleWrapper>
                    <BlockTitle text="Schedule" />
                  </StyledTitleWrapper>
                  <Timmings timmings={getTimmings(timings)} />
                </StyledSectionBlock>
                <StyledSectionBlock>
                  <StyledTitleWrapper>
                    <BlockTitle text="Rating" />
                  </StyledTitleWrapper>
                  <Rating value={rating} votes={votes} />
                </StyledSectionBlock>
                <StyledSectionBlock>
                  <StyledTitleWrapper>
                    <BlockTitle text="Average Cost" />
                  </StyledTitleWrapper>
                  <BlockText text={`€${average} for two people`} />
                </StyledSectionBlock>
                {establishment && (
                  <StyledSectionBlock>
                    <StyledTitleWrapper>
                      <BlockTitle text="Establishment type" />
                    </StyledTitleWrapper>
                    <BlockText text={establishment} />
                  </StyledSectionBlock>
                )}
              </div>
              <div className="cell small-12 medium-6">
                <StyledSectionBlock>
                  <StyledTitleWrapper>
                    <BlockTitle text="More info" />
                  </StyledTitleWrapper>
                  <Highlights highlights={highlights} />
                </StyledSectionBlock>
              </div>
              {reviews && reviews.length > 0 && (
                <div className="cell small-12">
                  <StyledSectionBlock>
                    <StyledReviewsWrapper>
                      <StyledTitleWrapper>
                        <BlockTitle text="Reviews" />
                      </StyledTitleWrapper>
                      {reviews.map((review) => (
                        <ReviewCard
                          key={review.id}
                          userImgSrc={review.userImgSrc}
                          userName={review.userName}
                          rating={review.rating}
                          date={review.date}
                          text={review.text}
                        />
                      ))}
                    </StyledReviewsWrapper>
                  </StyledSectionBlock>
                </div>
              )}
            </div>
            <div className="cell small-12 large-5">
              <StyledAddressWrapper className="paper">
                <StyledSectionBlock>
                  <StyledTitleWrapper>
                    <BlockTitle text="Phone" />
                  </StyledTitleWrapper>
                  <StyledPhone>{phone}</StyledPhone>
                </StyledSectionBlock>
                <StyledSectionBlock>
                  <StyledTitleWrapper>
                    <BlockTitle text="Address" />
                  </StyledTitleWrapper>
                  <Address
                    mapSrc={getMapSrc(name, location)}
                    address={address}
                  />
                </StyledSectionBlock>
              </StyledAddressWrapper>
            </div>
          </div>
        </StyledInformation>
        {relatedRestaurants.length > 0 && (
          <StyledRelatedRestaurants>
            <Title text="Related restaurants" />
            <div className="grid-x grid-margin-x grid-margin-y">
              <RelatedRestaurants
                restaurants={relatedRestaurants}
                onClickRelatedRestaurant={onClickRelatedRestaurant}
              />
            </div>
          </StyledRelatedRestaurants>
        )}
      </StyledDetailPage>
    </Layout>
  );
};

export default DetailPage;
