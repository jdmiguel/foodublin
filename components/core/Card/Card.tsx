import React from 'react';
import styled, { css } from 'styled-components';
import { LazyImage } from 'react-lazy-images';

import CustomLink, { CustomLinkSize } from '../CustomLink/CustomLink';

import { THUMB_GENERIC_SRC } from '../../../helpers/staticData';

type CardProps = {
  className?: string;
  link: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  firstText: string;
  secondText: string;
};

const CardTextCSS = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 92%;
`;

const CardImageCSS = css`
  width: 80px;
  height: 80px;
  min-width: 80px;
  min-height: 80px;
  @media only screen and (min-width: 768px) {
    width: 100px;
    height: 100px;
    min-width: 100px;
    min-height: 100px;
  }
`;

const StyledCard = styled.div`
  width: 100%;
  max-width: 485px;
  display: flex;
  overflow: hidden;
`;

const StyledImage = styled(LazyImage)`
  ${CardImageCSS}
  margin-right: 14px;
  @media only screen and (min-width: 768px) {
    margin-right: 16px;
  }
  @media only screen and (min-width: 1200px) {
    margin-right: 20px;
  }
`;

const StyledGenericThumb = styled.img`
  ${CardImageCSS}
`;

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 5px 0;
  width: 65%;
  @media only screen and (min-width: 768px) {
    padding: 10px 0;
  }
`;

const StyledTitle = styled(CustomLink)`
  ${CardTextCSS}
  display: block;
`;

const StyledFirstText = styled.p`
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

const StyledSecondText = styled.p`
  ${CardTextCSS}
  font-size: 0.9rem;
  line-height: 0.9rem;
  color: ${(props) => props.theme.palette.DARK_MIN};
  @media only screen and (min-width: 1200px) {
    font-size: 1rem;
    line-height: 1rem;
  }
`;

const Card: React.FC<CardProps> = ({
  className,
  link,
  imgSrc,
  imgAlt,
  title,
  firstText,
  secondText,
}) => (
  <StyledCard className={`${className} paper`}>
    <StyledImage
      src={imgSrc}
      alt={imgAlt}
      placeholder={({ imageProps, ref }) => (
        <div ref={ref} className="LazyImage-Placeholder">
          <StyledGenericThumb src={THUMB_GENERIC_SRC} alt={imageProps.alt} />
        </div>
      )}
      actual={({ imageProps }) => (
        <div className="LazyImage-Actual">
          <img {...imageProps} alt={imgAlt} />
        </div>
      )}
    />
    <StyledText>
      <StyledTitle route={link} size={CustomLinkSize.BIG}>
        {title}
      </StyledTitle>
      <StyledFirstText>{firstText}</StyledFirstText>
      <StyledSecondText>{secondText}</StyledSecondText>
    </StyledText>
  </StyledCard>
);

export default Card;
