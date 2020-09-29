import React, { ReactNode, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { LazyImage } from 'react-lazy-images';

import {
  THUMB_GENERIC_SRC,
  HIGHLIGHT_GENERIC_SRC,
} from '../../../helpers/staticData';

export enum CardType {
  SUGGESTION = 'suggestion',
  STANDART = 'standart',
  HIGHLIGHT = 'highlight',
}

type CardProps = {
  imgSrc: string;
  title: string;
  content: ReactNode | string;
  type?: CardType;
  onClick?: () => void;
};

const CardTextCSS = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 92%;
`;

const StandartCardImageCSS = css`
  max-width: 100px;
  height: 100%;
  min-width: 80px;
  @media only screen and (min-width: 768px) {
    width: 100px;
    min-width: 100px;
  }
`;

const SuggestionCardImageCSS = css`
  width: 30px;
  height: 30px;
  border: solid ${({ theme }) => theme.palette.LIGHT_MAX} 1px;
  display: inline-block;
  border-radius: 4px;
  -webkit-appearance: button-bevel;
  box-shadow: 1px 2px 5px #888;
`;

const HighlightCardImageCss = css`
  width: 100%;
  max-width: 350px;
  margin-bottom: 18px;
  width: 100%;
  max-width: 350px;
  margin-bottom: 18px;
  border: 1px solid ${({ theme }) => theme.palette.LIGHT_MEDIUM};
`;

const StyledCard = styled.a<{ type: CardType }>`
  width: 100%;
  max-width: ${({ type }) => (type === CardType.HIGHLIGHT ? '350px' : '600px')};
  height: 100%;
  min-height: ${({ type }) => type === CardType.STANDART && '100px'};
  overflow: hidden;
  display: flex;
  flex-direction: ${({ type }) => type === CardType.HIGHLIGHT && 'column'};
  align-items: ${({ type }) => type === CardType.SUGGESTION && 'center'};
  padding: ${({ type }) => {
    switch (type) {
      case CardType.HIGHLIGHT:
        return '15px 15px 25px';
      case CardType.SUGGESTION:
        return '0 0 0 10px';
      case CardType.STANDART:
      default:
        return '0';
    }
  }};
  cursor: pointer;
  background-color: ${({ type, theme }) =>
    type !== CardType.SUGGESTION && theme.palette.LIGHT_MAX};
  @media only screen and (min-width: 768px) {
    transition: background-color 0.2s ease-out;
    &:hover {
      background-color: ${({ theme }) => theme.palette.PRIMARY_LIGHT};
      h4 {
        color: ${({ theme }) => theme.palette.PRIMARY};
      }
    }
  }
`;

const getImageCss = (type: CardType) => {
  switch (type) {
    case CardType.SUGGESTION:
      return SuggestionCardImageCSS;
    case CardType.HIGHLIGHT:
      return HighlightCardImageCss;
    case CardType.STANDART:
    default:
      return StandartCardImageCSS;
  }
};

const StyledImage = styled(LazyImage)<{ type: CardType }>`
  ${({ type }) => getImageCss(type)}
`;

const StyledGenericThumb = styled.img<{ type: CardType }>`
  ${({ type }) => getImageCss(type)}
`;

const StyledText = styled.div<{ type: CardType }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ type }) =>
    type === CardType.HIGHLIGHT ? 'space-around' : 'space-evenly'};
  padding: ${({ type }) => type !== CardType.HIGHLIGHT && '5px 0'};
  width: ${({ type }) => type !== CardType.HIGHLIGHT && '65%'};
  margin-left: ${({ type }) => type !== CardType.HIGHLIGHT && '14px'};
  @media only screen and (min-width: 768px) {
    font-size: 1.3rem;
    line-height: 1.3rem;
    padding: ${({ type }) => type !== CardType.HIGHLIGHT && '10px 0'};
    margin-left: ${({ type }) => type !== CardType.HIGHLIGHT && '16px'};
  }
  @media only screen and (min-width: 1200px) {
    margin-left: ${({ type }) => type !== CardType.HIGHLIGHT && '20px'};
  }
`;

const StyledTitle = styled.h4<{ type: CardType }>`
  ${({ type }) => type !== CardType.HIGHLIGHT && CardTextCSS}
  font-size: ${({ type }) =>
    type === CardType.SUGGESTION ? '1.05rem' : '1.3rem'};
  font-weight: 600;
  color: ${({ theme }) => theme.palette.PRIMARY_MEDIUM};
  margin-bottom: ${({ type }) => type === CardType.HIGHLIGHT && '6px'};
  @media only screen and (min-width: 768px) {
    transition: color 0.2s ease-out;
  }
`;

const StyledContent = styled.p<{ type: CardType }>`
  ${({ type }) => type !== CardType.HIGHLIGHT && CardTextCSS}
  font-size: ${({ type }) => (type === CardType.STANDART ? '1rem' : '0.92rem')};
  line-height: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.DARK_MEDIUM};
`;

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
