import React from 'react';
import styled from 'styled-components';
import { LazyImage } from 'react-lazy-images';

import CustomLink, { CustomLinkSize } from '../CustomLink/CustomLink';
import BlockText from '../BlockText/BlockText';

import { HIGHLIGHT_GENERIC_SRC } from '../../../helpers/staticData';

type HighlightCardProps = {
  className?: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  linkUrl: string;
  description: string;
};

const StyledHighlightCard = styled.div`
  width: 100%;
  max-width: 350px;
  padding: 15px 15px 25px;
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

const StyledCustomLink = styled(CustomLink)`
  margin-bottom: 6px;
`;

const HighlightCard: React.FC<HighlightCardProps> = ({
  className,
  imgSrc,
  imgAlt,
  title,
  description,
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
      <StyledCustomLink
        route={linkUrl}
        isExternal={true}
        size={CustomLinkSize.BIG}
      >
        {title}
      </StyledCustomLink>
      <BlockText text={description} />
    </StyledText>
  </StyledHighlightCard>
);

export default HighlightCard;
