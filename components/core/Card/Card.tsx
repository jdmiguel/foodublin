import React, { ReactNode, forwardRef } from 'react';

import {
  StyledCard,
  StyledImage,
  StyledGenericThumb,
  StyledText,
  StyledTitle,
  StyledContent,
} from './styles';

import {
  THUMB_GENERIC_SRC,
  HIGHLIGHT_GENERIC_SRC,
} from '../../../helpers/staticData';
import { CardType } from '../../../helpers/types';

type CardProps = {
  imgSrc: string;
  title: string;
  content: ReactNode | string;
  type?: CardType;
  onClick?: () => void;
};

export const Card = forwardRef<HTMLAnchorElement, CardProps>(
  (
    { imgSrc, title, content, onClick, type = CardType.STANDART },
    forwardedRef,
  ) => (
    <StyledCard
      ref={forwardedRef}
      className={type === CardType.SUGGESTION ? '' : 'paper'}
      onClick={onClick && onClick}
      type={type}
      data-testid="card"
    >
      <StyledImage
        src={imgSrc}
        alt={title}
        type={type}
        placeholder={({ imageProps, ref }) => (
          <div ref={ref} className="LazyImage-Placeholder">
            <StyledGenericThumb
              src={
                type === CardType.HIGHLIGHT
                  ? HIGHLIGHT_GENERIC_SRC
                  : THUMB_GENERIC_SRC
              }
              alt={imageProps.alt}
              type={type}
            />
          </div>
        )}
        actual={({ imageProps }) => (
          <div className="LazyImage-Actual">
            <img {...imageProps} alt={title} />
          </div>
        )}
      />
      <StyledText type={type}>
        <StyledTitle type={type}>{title}</StyledTitle>
        <StyledContent type={type}>{content}</StyledContent>
      </StyledText>
    </StyledCard>
  ),
);

Card.displayName = 'Card';
