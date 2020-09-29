import React from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';

import { CustomLink } from '../CustomLink/CustomLink';

import { BreadcrumbsData } from '../../../helpers/types';

type BreadcrumbsProps = {
  breadcrumbsData: BreadcrumbsData[];
};

const lastBreadcrumbCSS = css`
  pointer-events: none;
  color: ${({ theme }) => theme.palette.DARK_SOFT};
  font-weight: 400;
`;

const smallDevicesTextCSS = css`
  @media only screen and (max-width: 330px) {
    font-size: 0.85rem;
  }
`;

const StyledBreadcrumbsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

const StyledBreadcrumb = styled.div<{ isLast: boolean }>`
  display: flex;
  align-items: center;
  margin-right: ${({ isLast }) => !isLast && '5px'};
`;

const StyledCustomLink = styled(CustomLink)<{ isLast: boolean }>`
  white-space: nowrap;
  margin: 0 5px 3px 0;
  ${({ isLast }) => isLast && lastBreadcrumbCSS};
  ${smallDevicesTextCSS}
  @media only screen and (min-width: 600px) {
    margin: 0 5px 0;
  }
`;

const StyledArrow = styled.span`
  color: ${({ theme }) => theme.palette.DARK_SOFT};
  font-weight: 600;
  margin-bottom: 3px;
  ${smallDevicesTextCSS}
  @media only screen and (min-width: 600px) {
    margin-bottom: 0;
  }
`;

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  breadcrumbsData,
}) => (
  <StyledBreadcrumbsWrapper>
    {breadcrumbsData.map((breadcrumbData, itemIndex, items) => {
      const isLast = itemIndex === items.length - 1;
      return (
        <StyledBreadcrumb key={breadcrumbData.text} isLast={isLast}>
          <Link href={breadcrumbData.route} as={breadcrumbData.asRoute}>
            <StyledCustomLink isLast={isLast}>
              {breadcrumbData.text}
            </StyledCustomLink>
          </Link>
          {itemIndex < items.length - 1 && <StyledArrow>{'>'}</StyledArrow>}
        </StyledBreadcrumb>
      );
    })}
  </StyledBreadcrumbsWrapper>
);
