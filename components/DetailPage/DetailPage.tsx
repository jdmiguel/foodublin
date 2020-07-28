import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { DefaultLayout } from '../../layouts';

import Title from '../core/Title/Title';
import Button from '../core/Button/Button';
import BlockTitle from '../core/BlockTitle/BlockTitle';
import BlockText from '../core/BlockText/BlockText';

import Rating from '../core/Rating/Rating';
import Timmings from './Timings';
import Cuisines from './Cuisines';
import Highlights from './Highlights';
import Address from './Address';
import RelatedRestaurants from './RelatedRestaurants';

import {
  FOURTH_DETAIL,
  RELATED_RESTAURANTS,
} from './__mocks__/detailpage.mocks';

import { getTimmings, getMapSrc } from '../../helpers/utils';

import { DETAIL_GENERIC_SRC } from '../../helpers/staticData';

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
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.45) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 50px 10px;
  @media only screen and (min-width: 640px) {
    padding: 70px 20px;
  }
`;

const StyledName = styled.h2`
  ${JumbotronTextCSS}
  font-size: 1.7rem;
  font-weight: 600;
  margin: 10px 0;
  @media only screen and (min-width: 640px) {
    font-size: 2.8rem;
    margin: 15px 0 25px;
  }
  @media only screen and (min-width: 992px) {
    font-size: 3.2rem;
    margin: 20px 0 30px;
  }
`;

const StyledLocation = styled.h2`
  ${JumbotronTextCSS}
  font-size: 1.3rem;
  margin-bottom: 20px;
  @media only screen and (min-width: 640px) {
    font-size: 2rem;
    margin-bottom: 30px;
  }
  @media only screen and (min-width: 992px) {
    font-size: 2.6rem;
    margin-bottom: 40px;
  }
`;

const StyledButton = styled(Button)`
  max-width: 140px;
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

const {
  imgSrc,
  rating,
  votes,
  name,
  location,
  average,
  establishment,
  timmings,
  cuisines,
  highlights,
  phone,
  address,
} = FOURTH_DETAIL;

const [establishmentType] = establishment;

const DetailPage: React.FC = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <DefaultLayout isExtendedHeader={false} isExtendedFooter={true}>
      <StyledDetailPage className="grid-container">
        <StyledJumbotron bgImg={imgSrc || DETAIL_GENERIC_SRC}>
          <StyledOverlay>
            <StyledName>{name}</StyledName>
            <StyledLocation>{location}</StyledLocation>
            <StyledButton
              onClick={() => {
                'handle favorite';
                setIsFavorite((favorite) => !favorite);
              }}
            >
              <i className="material-icons">{`${
                isFavorite ? 'favorite_border' : 'favorite'
              }`}</i>
              {`${isFavorite ? 'unsaved' : 'saved'}`}
            </StyledButton>
          </StyledOverlay>
        </StyledJumbotron>
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
                  <Timmings timmings={getTimmings(timmings)} />
                </StyledSectionBlock>
                <StyledSectionBlock>
                  <StyledBlockTitle text="Rating" />
                  <Rating value={rating} votes={votes} />
                </StyledSectionBlock>
                <StyledSectionBlock>
                  <StyledBlockTitle text="Average Cost" />
                  <BlockText text={`€${average} for two people`} />
                </StyledSectionBlock>
                {establishmentType && (
                  <StyledSectionBlock>
                    <StyledBlockTitle text="Establishment type" />
                    <BlockText text={establishmentType} />
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
        <StyledRelatedRestaurants>
          <Title text="Related restaurants" />
          <div className="grid-x grid-margin-x grid-margin-y">
            <RelatedRestaurants restaurants={RELATED_RESTAURANTS} />
          </div>
        </StyledRelatedRestaurants>
      </StyledDetailPage>
    </DefaultLayout>
  );
};

export default DetailPage;
