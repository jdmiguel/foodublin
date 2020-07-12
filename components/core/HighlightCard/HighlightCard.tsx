import React from 'react';
import styled from 'styled-components';
import { LazyImage } from 'react-lazy-images';

import BlockTitle from '../BlockTitle/BlockTitle';
import BlockText from '../BlockText/BlockText';

import { HIGHLIGHT_GENERIC_SRC } from '../../../helpers/staticData';

type HighlightCardProps = {
  className?: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
};

const StyledHighlightCard = styled.div`
  width: 100%;
  max-width: 350px;
  padding: 15px;
  img {
    width: 100%;
    max-width: 350px;
    margin-bottom: 18px;
    width: 100%;
    max-width: 350px;
    margin-bottom: 18px;
    border: 1px solid ${(props) => props.theme.palette.LIGHT_MEDIUM};
  }
  @media only screen and (min-width: 1200px) {
    justify-content: space-between;
  }
`;

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StyledLink = styled.a`
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.PRIMARY_MEDIUM};
  transition: color 0.2s ease-out;
  margin-top: 15px;
  &:hover {
    color: ${(props) => props.theme.palette.PRIMARY};
  }
`;

const HighlightCard: React.FC<HighlightCardProps> = ({
  className,
  imgSrc,
  imgAlt,
  title,
  description,
  linkText,
  linkUrl,
}) => (
  <StyledHighlightCard className={`${className} paper`}>
    <LazyImage
      src={imgSrc}
      alt={imgAlt}
      placeholder={({ imageProps, ref }) => (
        <div ref={ref} className="LazyImage-Placeholder">
          <img src={HIGHLIGHT_GENERIC_SRC} alt={imageProps.alt} />
        </div>
      )}
      actual={({ imageProps }) => (
        <div className="LazyImage-Actual">
          <img {...imageProps} alt={imgAlt} />
        </div>
      )}
    />
    <StyledText>
      <BlockTitle text={title} />
      <BlockText text={description} />
      <StyledLink href={linkUrl} target="blank">
        {linkText}
      </StyledLink>
    </StyledText>
  </StyledHighlightCard>
);

export default HighlightCard;
