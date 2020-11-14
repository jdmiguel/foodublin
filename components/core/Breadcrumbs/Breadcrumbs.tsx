import React, { useState, useEffect } from 'react';

import {
  StyledBreadcrumbsLoading,
  StyledBreadcrumbsWrapper,
  StyledBreadcrumb,
  StyledCustomLink,
  StyledArrow,
} from './styles';

import { DEFAULT_TEXT_LOADING } from '../../../helpers/staticData';
import { BreadcrumbsData } from '../../../helpers/types';

type BreadcrumbsProps = {
  breadcrumbsData: BreadcrumbsData[];
  onClickBreadcrumb: (route: string, asRoute: string) => void;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  breadcrumbsData,
  onClickBreadcrumb,
}) => {
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setIsloading(false);
  }, []);

  return isLoading ? (
    <StyledBreadcrumbsLoading>{DEFAULT_TEXT_LOADING}</StyledBreadcrumbsLoading>
  ) : (
    <StyledBreadcrumbsWrapper>
      {breadcrumbsData.map((breadcrumbData, itemIndex, items) => {
        const isLast = itemIndex === items.length - 1;
        return (
          <StyledBreadcrumb key={breadcrumbData.text} isLast={isLast}>
            <StyledCustomLink
              disabled={isLast}
              onClick={() =>
                onClickBreadcrumb(breadcrumbData.route, breadcrumbData.asRoute)
              }
            >
              {breadcrumbData.text}
            </StyledCustomLink>
            {itemIndex < items.length - 1 && <StyledArrow>{'>'}</StyledArrow>}
          </StyledBreadcrumb>
        );
      })}
    </StyledBreadcrumbsWrapper>
  );
};
