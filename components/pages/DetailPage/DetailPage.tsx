import React, { useState } from 'react';
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
  StyledAddressWrapper,
  StyledPhone,
  StyledRelatedRestaurants,
} from './styles';

import { RestaurantDetail, Restaurant } from '../../../helpers/types';
import { getTimmings, getMapSrc } from '../../../helpers/utils';
import {
  DETAIL_GENERIC_SRC,
  DEFAULT_TEXT_LOADING,
} from '../../../helpers/staticData';

type DetailPageProps = {
  data: RestaurantDetail;
  isLoading: boolean;
  isFavorite: boolean;
  relatedRestaurants: Restaurant[];
  onClickSaveButton: (action: string) => void;
  onClickRelatedRestaurant: () => void;
};

export const DetailPage: React.FC<DetailPageProps> = ({
  data: {
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
  isLoading,
  isFavorite,
  relatedRestaurants,
  onClickSaveButton,
  onClickRelatedRestaurant,
}) => {
  const [isSaved, setIsSaved] = useState(isFavorite);

  const cuisinesList = cuisines.split(',');

  const clickSaveButton = () => {
    setIsSaved((isSaved) => !isSaved);
    onClickSaveButton(isFavorite ? 'unsave' : 'save');
  };

  const getOverlay = () => (
    <StyledOverlay>
      <StyledName>{name}</StyledName>
      <StyledLocation>{location}</StyledLocation>
      <StyledButton onClick={clickSaveButton}>
        <i className="material-icons">{`${
          isSaved ? 'favorite' : 'favorite_border'
        }`}</i>
        {`${isSaved ? 'saved' : 'unsaved'}`}
      </StyledButton>
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

  return isLoading ? (
    <FullLoader>
      <Loader text={DEFAULT_TEXT_LOADING} />
    </FullLoader>
  ) : (
    <Layout isExtendedFooter={true}>
      <StyledDetailPage className="grid-container">
        {getJumbotron(imgSrc)}
        <StyledInformation>
          <Title text="Relevant information" />
          <div className="grid-x">
            <div className="grid-x cell small-12 medium-8">
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
            </div>
            <div className="cell small-12 medium-4">
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
