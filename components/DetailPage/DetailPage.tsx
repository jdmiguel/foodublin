import React from 'react';
import styled, { css } from 'styled-components';

import { DefaultLayout } from '../../layouts';

import Title from '../core/Title/Title';

import Timmings from './Timings';
import Cuisines from './Cuisines';
import Highlights from './Highlights';
import Address from './Address';
import RelatedRestaurants from './RelatedRestaurants';

import { DETAIL, RELATED_RESTAURANTS } from './__mocks__/detailpage.mocks';

import { getTimmings, getMapSrc } from '../../helpers/utils';

const RankStars = () => {
  const StyledRankStarsWrapper = styled.div`
    display: flex;
  `;

  const StyledRankStar = styled.i`
    font-size: 2.2rem;
    color: ${(props) => props.theme.palette.LIGHT_MIN};
    @media only screen and (min-width: 640px) {
      font-size: 2.7rem;
    }
  `;

  return (
    <StyledRankStarsWrapper>
      <StyledRankStar className="material-icons">star</StyledRankStar>
      <StyledRankStar className="material-icons">star</StyledRankStar>
      <StyledRankStar className="material-icons">star</StyledRankStar>
      <StyledRankStar className="material-icons">star_outline</StyledRankStar>
      <StyledRankStar className="material-icons">star_outline</StyledRankStar>
    </StyledRankStarsWrapper>
  );
};

const JumbotronTextCSS = css`
  color: ${(props) => props.theme.palette.LIGHT_MIN};
`;

const StyledDetailPage = styled.div`
  margin-top: 50px;
  margin-bottom: 35px;
  @media only screen and (min-width: 1024px) {
    margin-top: 75px;
    padding: 0 30px;
  }
`;

const StyledJumbotron = styled.div<{ bgImg: string }>`
  background-size: cover;
  background-image: url(${(props) => props.bgImg && props.bgImg});
  background-color: ${(props) => props.theme.palette.DARK_SOFT};
  background-position: center;
  display: flex;
  width: 100%;
  height: 220px;
  margin: 0;
  @media only screen and (min-width: 640px) {
    height: 300px;
  }
`;

const StyledOverlay = styled.div`
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.5) 25%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.5) 75%,
    rgba(0, 0, 0, 0.3) 100%
  );
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 50px 0;
  @media only screen and (min-width: 640px) {
    padding: 70px 0;
  }
`;

const StyledName = styled.h2`
  ${JumbotronTextCSS}
  font-size: 1.7rem;
  font-weight: 600;
  @media only screen and (min-width: 992px) {
    font-size: 3.2rem;
  }
`;

const StyledLocation = styled.h2`
  ${JumbotronTextCSS}
  font-size: 1.3rem;
  @media only screen and (min-width: 992px) {
    font-size: 2.6rem;
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

const StyledSectionTitle = styled.h4`
  color: ${(props) => props.theme.palette.DARK_MEDIUM};
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 15px;
  @media only screen and (min-width: 992px) {
    font-size: 1.45rem;
  }
`;

const StyledPhone = styled.h5`
  color: ${(props) => props.theme.palette.PRIMARY};
  font-size: 1.2rem;
  line-height: 0;
`;

const StyledAddressWrapper = styled.div`
  background-color: ${(props) => props.theme.palette.LIGHT_MAX};
  border: 1px solid ${(props) => props.theme.palette.LIGHT_SOFT};
  padding: 15px;
`;

const StyledRelatedRestaurants = styled.div`
  margin-top: 50px;
`;

const {
  imgSrc,
  name,
  location,
  average,
  establishment,
  timmings,
  cuisines,
  highlights,
  phone,
  address,
} = DETAIL;

const DetailPage: React.FC = () => (
  <DefaultLayout isExtendedHeader={false}>
    <StyledDetailPage className="grid-container">
      <StyledJumbotron bgImg={imgSrc}>
        <StyledOverlay>
          <StyledName>{name}</StyledName>
          <StyledLocation>{location}</StyledLocation>
          <RankStars />
        </StyledOverlay>
      </StyledJumbotron>
      <StyledInformation>
        <Title text="Relevant information" />
        <div className="grid-x">
          <div className="grid-x cell small-12 medium-8">
            <div className="cell small-12 medium-6">
              <StyledSectionBlock>
                <StyledSectionTitle>Cuisines</StyledSectionTitle>
                <Cuisines cuisines={cuisines} />
              </StyledSectionBlock>
              <StyledSectionBlock>
                <StyledSectionTitle>Schedule</StyledSectionTitle>
                <Timmings timmings={getTimmings(timmings)} />
              </StyledSectionBlock>
              <StyledSectionBlock>
                <StyledSectionTitle>Average Cost</StyledSectionTitle>
                <p>{`€${average} for two people`}</p>
              </StyledSectionBlock>
              <StyledSectionBlock>
                <StyledSectionTitle>Establishment type</StyledSectionTitle>
                <p>{establishment}</p>
              </StyledSectionBlock>
            </div>
            <div className="cell small-12 medium-6">
              <StyledSectionBlock>
                <StyledSectionTitle>More info</StyledSectionTitle>
                <Highlights highlights={highlights} />
              </StyledSectionBlock>
            </div>
          </div>
          <div className="cell small-12 medium-4">
            <StyledAddressWrapper>
              <StyledSectionBlock>
                <StyledSectionTitle>Phone</StyledSectionTitle>
                <StyledPhone>{phone}</StyledPhone>
              </StyledSectionBlock>
              <StyledSectionBlock>
                <StyledSectionTitle>Address</StyledSectionTitle>
                <Address mapSrc={getMapSrc(name)} address={address} />
              </StyledSectionBlock>
            </StyledAddressWrapper>
          </div>
        </div>
      </StyledInformation>
      <StyledRelatedRestaurants>
        <Title text="Related restaurants" />
        <div className="grid-x grid-margin-x grid-margin-y">
          <RelatedRestaurants restaurants={RELATED_RESTAURANTS} />
        </div>
      </StyledRelatedRestaurants>
    </StyledDetailPage>
  </DefaultLayout>
);

export default DetailPage;
