import React from 'react';
import styled, { css } from 'styled-components';

import CustomLink from '../CustomLink/CustomLink';

import { BreadcrumbsData } from '../../../helpers/types';

type BreadcrumbsProps = {
  breadcrumbsData: BreadcrumbsData[];
};

const lastBreadcrumbCSS = css`
  pointer-events: none;
  color: ${(props) => props.theme.palette.DARK_SOFT};
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

const StyledLink = styled(CustomLink)<{ isLast: boolean }>`
  white-space: nowrap;
  margin-right: 5px;
  ${({ isLast }) => isLast && lastBreadcrumbCSS};
  ${smallDevicesTextCSS}
`;

const StyledArrow = styled.span`
  color: ${(props) => props.theme.palette.DARK_SOFT};
  font-weight: 600;
  ${smallDevicesTextCSS}
`;

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbsData }) => (
  <StyledBreadcrumbsWrapper>
    {breadcrumbsData.map((breadcrumbData, itemIndex, items) => {
      const isLast = itemIndex === items.length - 1;
      return (
        <StyledBreadcrumb key={breadcrumbData.text} isLast={isLast}>
          <StyledLink
            route={breadcrumbData.route}
            asRoute={breadcrumbData.asRoute}
            isLast={isLast}
          >
            {breadcrumbData.text}
          </StyledLink>
          {itemIndex < items.length - 1 && <StyledArrow>{'>'}</StyledArrow>}
        </StyledBreadcrumb>
      );
    })}
  </StyledBreadcrumbsWrapper>
);

export default Breadcrumbs;
