import React from 'react';
import Link from 'next/link';

import {
  StyledBreadcrumbsWrapper,
  StyledBreadcrumb,
  StyledCustomLink,
  StyledArrow,
} from './styles';

import { BreadcrumbsData } from '../../../helpers/types';

type BreadcrumbsProps = {
  breadcrumbsData: BreadcrumbsData[];
};

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
