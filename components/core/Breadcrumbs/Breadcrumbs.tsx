import React from 'react';
import styled, { css } from 'styled-components';

import CustomLink from '../CustomLink/CustomLink';

type BreadcrumbData = {
  text: string;
  route: string;
};

type BreadcrumbsProps = {
  className?: string;
  breadcrumbsData: BreadcrumbData[];
};

const lastBreadcrumbCSS = css`
  pointer-events: none;
  color: ${(props) => props.theme.palette.DARK_SOFT};
  font-weight: 400;
`;

const StyledBreadcrumbsWrapper = styled.div`
  display: flex;
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
`;

const StyledArrow = styled.span`
  color: ${(props) => props.theme.palette.DARK_SOFT};
  font-weight: 600;
`;

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbsData }) => (
  <StyledBreadcrumbsWrapper>
    {breadcrumbsData.map((breadcrumbData, itemIndex, items) => {
      const isLast = itemIndex === items.length - 1;
      return (
        <StyledBreadcrumb key={breadcrumbData.text} isLast={isLast}>
          <StyledLink route={breadcrumbData.route} isLast={isLast}>
            {breadcrumbData.text}
          </StyledLink>
          {itemIndex < items.length - 1 && <StyledArrow>{'>'}</StyledArrow>}
        </StyledBreadcrumb>
      );
    })}
  </StyledBreadcrumbsWrapper>
);

export default Breadcrumbs;
