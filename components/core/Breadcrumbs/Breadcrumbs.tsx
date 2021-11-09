import { useState, useEffect } from 'react';
import { CustomLink } from '../CustomLink/CustomLink';
import {
  StyledBreadcrumbsLoading,
  StyledBreadcrumbsWrapper,
  StyledBreadcrumb,
  StyledCustomLinkWrapper,
  StyledArrow,
} from './styles';
import { DEFAULT_TEXT_LOADING } from '@/store/statics';
import { BreadcrumbsData } from '../types';

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
    <StyledBreadcrumbsWrapper data-testid="breadcrumbs">
      {breadcrumbsData.map((breadcrumbData, itemIndex, items) => {
        const isLast = itemIndex === items.length - 1;
        return (
          <StyledBreadcrumb key={breadcrumbData.text} isLast={isLast}>
            <StyledCustomLinkWrapper>
              <CustomLink
                disabled={isLast}
                onClick={() =>
                  onClickBreadcrumb(
                    breadcrumbData.route,
                    breadcrumbData.asRoute,
                  )
                }
              >
                {breadcrumbData.text}
              </CustomLink>
            </StyledCustomLinkWrapper>

            {itemIndex < items.length - 1 && <StyledArrow>{'>'}</StyledArrow>}
          </StyledBreadcrumb>
        );
      })}
    </StyledBreadcrumbsWrapper>
  );
};
