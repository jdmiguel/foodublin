import React, { useState, useEffect } from 'react';
import { LazyImage } from 'react-lazy-images';

import { Layout } from '../../layouts/Layout/Layout';

import { FullLoader } from '../../ui/FullLoader/FullLoader';

import { Loader } from '../../core/Loader/Loader';
import { Title } from '../../core/Title/Title';
import { BlockText } from '../../core/BlockText/BlockText';
import { Rating } from '../../core/Rating/Rating';

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
  StyledButton,
  StyledJumbotron,
  StyledDetailPage,
  StyledInformation,
  StyledSectionBlock,
  StyledBlockTitle,
  StyledReviewsWrapper,
  StyledAddressWrapper,
  StyledPhone,
  StyledRelatedRestaurants,
} from './styles';

import { getFormattedUrlText } from '@/helpers/utils';
import { DETAIL_GENERIC_SRC, DEFAULT_TEXT_LOADING } from '@/store/statics';

import { LoaderType } from '../../core/types';
import { RestaurantDetail, Restaurant, Review, Timming } from '../types';

type DetailPageProps = {
  detail: RestaurantDetail;
  reviews: Review[] | null;
  isFavorite: boolean;
  relatedRestaurants: Restaurant[];
  onClickSaveButton: (action: string) => void;
  onClickRelatedRestaurant: (route: string, asRoute: string) => void;
  isNavigating: boolean;
  onNavigate: () => void;
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

  const getOverlay = () => (
    <StyledOverlay>
      <StyledName>{name}</StyledName>
      <StyledLocation>{location}</StyledLocation>
      {isLoading ? (
        <StyledButton onClick={clickSaveButton}>
          {DEFAULT_TEXT_LOADING}
        </StyledButton>
      ) : (
        <StyledButton onClick={clickSaveButton}>
          <i className="material-icons">{`${
            isSaved ? 'favorite' : 'favorite_border'
          }`}</i>
          {`${isSaved ? 'saved' : 'unsaved'}`}
        </StyledButton>
      )}
    </StyledOverlay>
  );

  const getStyledJumbotron = (ref: any, imgSrc: string) => (
    <StyledJumbotron ref={ref} bgImg={imgSrc}>
      {getOverlay()}
    </StyledJumbotron>
  );

  const getJumbotron = (imgSrc: string) => {
    if (imgSrc) {
      return (
        <LazyImage
          src={imgSrc}
          placeholder={({ ref }) => getStyledJumbotron(ref, DETAIL_GENERIC_SRC)}
          actual={({ imageProps }) => getStyledJumbotron(null, imageProps.src)}
        />
      );
    }

    return getStyledJumbotron(null, DETAIL_GENERIC_SRC);
  };

  return (
    <Layout isExtendedFooter={true} onNavigate={onNavigate}>
      <StyledDetailPage className="grid-container">
        <FullLoader isShowed={isNavigating} type={LoaderType.LINE}>
          <Loader type={LoaderType.LINE} />
        </FullLoader>
        {getJumbotron(imgSrc)}
        <StyledInformation>
          <Title text="Relevant information" />
          <div className="grid-x">
            <div className="grid-x cell small-12 large-7">
              <div className="cell small-12 medium-6">
                <StyledSectionBlock>
                  <StyledBlockTitle text="Cuisines" />
                  <Cuisines cuisines={cuisinesList} />
                </StyledSectionBlock>
                <StyledSectionBlock>
                  <StyledBlockTitle text="Schedule" />
                  <Timmings timmings={getTimmings(timings)} />
                </StyledSectionBlock>
                <StyledSectionBlock>
                  <StyledBlockTitle text="Rating" />
                  <Rating value={rating} votes={votes} />
                </StyledSectionBlock>
                <StyledSectionBlock>
                  <StyledBlockTitle text="Average Cost" />
                  <BlockText text={`€${average} for two people`} />
                </StyledSectionBlock>
                {establishment && (
                  <StyledSectionBlock>
                    <StyledBlockTitle text="Establishment type" />
                    <BlockText text={establishment} />
                  </StyledSectionBlock>
                )}
              </div>
              <div className="cell small-12 medium-6">
                <StyledSectionBlock>
                  <StyledBlockTitle text="More info" />
                  <Highlights highlights={highlights} />
                </StyledSectionBlock>
              </div>
              {reviews && reviews.length > 0 && (
                <div className="cell small-12">
                  <StyledSectionBlock>
                    <StyledReviewsWrapper>
                      <StyledBlockTitle text="Reviews" />
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
                  <StyledBlockTitle text="Phone" />
                  <StyledPhone>{phone}</StyledPhone>
                </StyledSectionBlock>
                <StyledSectionBlock>
                  <StyledBlockTitle text="Address" />
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
