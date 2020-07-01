import React from 'react';
import styled from 'styled-components';
import { LazyImage } from 'react-lazy-images';

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
  background-color: ${(props) => props.theme.palette.LIGHT_MAX};
  padding: 1rem;
  margin-bottom: 50px;
  border: 1px solid ${(props) => props.theme.palette.LIGHT_SOFT};
  border-radius: 4px;
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

const StyledTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette.DARK_MAX};
  margin-bottom: 15px;
`;

const StyledDescription = styled.p`
  font-size: 1rem;
  line-height: 1.2rem;
  color: ${(props) => props.theme.palette.DARK_MAX};
  margin-bottom: 15px;
`;

const StyledLink = styled.a`
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.PRIMARY_MEDIUM};
  transition: color 0.2s ease-out;
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
  <StyledHighlightCard className={className}>
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
      <StyledTitle>{title}</StyledTitle>
      <StyledDescription>{description}</StyledDescription>
      <StyledLink href={linkUrl} target="blank">
        {linkText}
      </StyledLink>
    </StyledText>
  </StyledHighlightCard>
);

export default HighlightCard;
