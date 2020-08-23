import React from 'react';
import styled, { css } from 'styled-components';
import { LazyImage } from 'react-lazy-images';

import CustomLink, { CustomLinkSize } from '../CustomLink/CustomLink';
import { CardType } from '../../../helpers/types';
import { THUMB_GENERIC_SRC } from '../../../helpers/staticData';

const CardTextCSS = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 92%;
`;

const CardImageCSS = css`
  max-width: 100px;
  height: 100%;
  min-width: 80px;
  @media only screen and (min-width: 768px) {
    width: 100px;
    min-width: 100px;
  }
`;

const StyledCard = styled.div`
  width: 100%;
  height: 100px;
  max-width: 485px;
  display: flex;
  overflow: hidden;
`;

const StyledImage = styled(LazyImage)`
  ${CardImageCSS}
`;

const StyledGenericThumb = styled.img`
  ${CardImageCSS}
`;

const StyledTitle = styled(CustomLink)`
  ${CardTextCSS}
  display: block;
`;

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 5px 0;
  width: 65%;
  margin-left: 14px;
  @media only screen and (min-width: 768px) {
    font-size: 1.3rem;
    line-height: 1.3rem;
    padding: 10px 0;
    margin-left: 16px;
  }
  @media only screen and (min-width: 1200px) {
    margin-left: 20px;
  }
`;

const StyledSubtitle = styled.p`
  ${CardTextCSS}
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette.DARK_MEDIUM};
  @media only screen and (min-width: 1200px) {
    font-size: 1.1rem;
    line-height: 1.1rem;
  }
`;

const Card: React.FC<CardType> = ({
  imgSrc,
  title,
  firstText,
  route,
  asRoute,
  onClick,
}) => (
  <StyledCard className="paper">
    <StyledImage
      src={imgSrc}
      alt={title}
      placeholder={({ imageProps, ref }) => (
        <div ref={ref} className="LazyImage-Placeholder">
          <StyledGenericThumb src={THUMB_GENERIC_SRC} alt={imageProps.alt} />
        </div>
      )}
      actual={({ imageProps }) => (
        <div className="LazyImage-Actual">
          <img {...imageProps} alt={title} />
        </div>
      )}
    />
    <StyledText>
      <StyledTitle
        route={route}
        asRoute={asRoute}
        size={CustomLinkSize.BIG}
        onClick={onClick}
      >
        {title}
      </StyledTitle>
      <StyledSubtitle>{firstText}</StyledSubtitle>
    </StyledText>
  </StyledCard>
);

export default Card;
