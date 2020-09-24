import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { LazyImage } from 'react-lazy-images';

import Layout from '../../layouts/Layout';

import FullLoader from '../../ui/FullLoader/FullLoader';

import Loader from '../../core/Loader/Loader';
import Title from '../../core/Title/Title';
import Button from '../../core/Button/Button';
import BlockTitle from '../../core/BlockTitle/BlockTitle';
import BlockText from '../../core/BlockText/BlockText';
import Rating from '../../core/Rating/Rating';

import Timmings from './Timings';
import Cuisines from './Cuisines';
import Highlights from './Highlights';
import Address from './Address';
import RelatedRestaurants from './RelatedRestaurants';

import { RestaurantDetail, Restaurant } from '../../../helpers/types';
import { getTimmings, getMapSrc } from '../../../helpers/utils';
import {
  DETAIL_GENERIC_SRC,
  DEFAULT_TEXT_LOADING,
} from '../../../helpers/staticData';

type DetailPageProps = {
  data: RestaurantDetail;
  isLoading: boolean;
  relatedRestaurants: Restaurant[];
  onClickSaveButton: (action: string) => void;
  onClickRelatedRestaurant: () => void;
};

const JumbotronTextCSS = css`
  color: ${(props) => props.theme.palette.LIGHT_MEDIUM};
  text-align: center;
  line-height: 1.5rem;
`;

const StyledDetailPage = styled.div`
  margin: 50px auto 70px;
  @media only screen and (min-width: 428px) {
    margin: 50px auto;
  }
  @media only screen and (min-width: 1024px) {
    margin: 75px auto 60px;
    padding: 0 30px;
  }
`;

const StyledJumbotron = styled.div<{ bgImg: string }>`
  background-size: cover;
  background-image: url(${({ bgImg }) => bgImg});
  background-color: ${(props) => props.theme.palette.DARK_SOFT};
  background-position: center;
  display: flex;
  width: 100%;
  height: 250px;
  margin: 0;
  @media only screen and (min-width: 640px) {
    height: 300px;
  }
`;

const StyledOverlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
`;

const StyledName = styled.h2`
  ${JumbotronTextCSS}
  font-size: 1.7rem;
  line-height: 1.5rem;
  font-weight: 600;
  @media only screen and (min-width: 640px) {
    line-height: 2.3rem;
    font-size: 2.6rem;
  }
  @media only screen and (min-width: 992px) {
    line-height: 2.5rem;
    font-size: 3rem;
  }
`;

const StyledLocation = styled.h3`
  ${JumbotronTextCSS}
  font-size: 1.3rem;
  line-height: 1.3rem;
  @media only screen and (min-width: 640px) {
    line-height: 2rem;
    font-size: 2rem;
  }
  @media only screen and (min-width: 992px) {
    line-height: 2rem;
    font-size: 2.6rem;
  }
`;

const StyledButton = styled(Button)`
  max-width: 140px;
  margin-top: 30px;
  @media only screen and (max-width: 639px) {
    max-width: 127px;
    height: 45px;
  }
`;

const StyledInformation = styled.div`
  margin: 50px 0;
`;

const StyledSectionBlock = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 30px;
  }
  &:last-of-type {
    margin-bottom: 30px;
    @media only screen and (min-width: 640px) {
      margin-bottom: 0;
    }
  }
`;

const StyledBlockTitle = styled(BlockTitle)`
  margin-bottom: 15px;
`;

const StyledPhone = styled.h5`
  color: ${(props) => props.theme.palette.PRIMARY};
  font-size: 1.2rem;
  line-height: 0;
`;

const StyledAddressWrapper = styled.div`
  padding: 15px;
`;

const StyledRelatedRestaurants = styled.div`
  margin-top: 50px;
`;

const DetailPage: React.FC<DetailPageProps> = ({
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
  relatedRestaurants,
  onClickSaveButton,
  onClickRelatedRestaurant,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const clickSaveButton = () => {
    setIsFavorite((favorite) => !favorite);
    onClickSaveButton(isFavorite ? 'unsave' : 'save');
  };

  const getOverlay = () => (
    <StyledOverlay>
      <StyledName>{name}</StyledName>
      <StyledLocation>{location}</StyledLocation>
      <StyledButton onClick={clickSaveButton}>
        <i className="material-icons">{`${
          isFavorite ? 'favorite' : 'favorite_border'
        }`}</i>
        {`${isFavorite ? 'saved' : 'unsaved'}`}
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

  return (
    <Layout isExtendedFooter={true}>
      <StyledDetailPage className="grid-container">
        <FullLoader isShowed={isLoading}>
          <Loader text={DEFAULT_TEXT_LOADING} />
        </FullLoader>
        {getJumbotron(imgSrc)}
        <StyledInformation>
          <Title text="Relevant information" />
          <div className="grid-x">
            <div className="grid-x cell small-12 medium-8">
              <div className="cell small-12 medium-6">
                <StyledSectionBlock>
                  <StyledBlockTitle text="Cuisines" />
                  <Cuisines cuisines={cuisines} />
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

export default DetailPage;
