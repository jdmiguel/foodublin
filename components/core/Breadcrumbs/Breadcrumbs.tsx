import React from 'react';
import styled, { css } from 'styled-components';

type BreadcrumbData = {
  text: string;
  link: string;
};

type BreadcrumbsProps = {
  className?: string;
  breadcrumbsData: BreadcrumbData[];
  onClick?: (link: string) => void;
};

const lastBreadcrumbCSS = css`
  pointer-events: none;
  color: ${(props) => props.theme.palette.DARK_SOFT};
`;

const StyledBreadcrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  display: inline-block;
`;

const StyledBreadcrumb = styled.button<{ isLast: boolean }>`
  color: ${(props) => props.theme.palette.PRIMARY_MEDIUM};
  white-space: nowrap;
  transition: color 0.2s ease-out;
  cursor: pointer;
  background: none;
  outline: none;
  position: relative;
  font-weight: 500;
  margin-right: 3px;
  &:hover {
    color: ${(props) => props.theme.palette.PRIMARY};
  }
  ${({ isLast }) => isLast && lastBreadcrumbCSS};
`;

const StyledArrow = styled.span`
  color: ${(props) => props.theme.palette.DARK_SOFT};
  font-weight: 600;
`;

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  breadcrumbsData,
  onClick,
}) => (
  <div>
    {breadcrumbsData.map((breadcrumbData, itemIndex, items) => (
      <StyledBreadcrumbWrapper key={breadcrumbData.text}>
        <StyledBreadcrumb
          onClick={() => {
            onClick &&
              itemIndex < items.length - 1 &&
              onClick(breadcrumbData.link);
          }}
          isLast={itemIndex === items.length - 1}
        >
          {breadcrumbData.text}
        </StyledBreadcrumb>
        {itemIndex < items.length - 1 && <StyledArrow>{'>'}</StyledArrow>}
      </StyledBreadcrumbWrapper>
    ))}
  </div>
);

export default Breadcrumbs;
