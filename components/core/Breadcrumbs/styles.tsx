import styled, { css } from 'styled-components';

import { CustomLink } from '../CustomLink/CustomLink';

const smallDevicesTextCSS = css`
  @media only screen and (max-width: 330px) {
    font-size: 0.85rem;
  }
`;

export const StyledBreadcrumbsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

export const StyledBreadcrumb = styled.div<{ isLast: boolean }>`
  display: flex;
  align-items: center;
  margin-right: ${({ isLast }) => !isLast && '5px'};
`;

export const StyledCustomLink = styled(CustomLink)`
  white-space: nowrap;
  margin: 0 5px 3px 0;
  ${smallDevicesTextCSS}
  @media only screen and (min-width: 600px) {
    margin: 0 5px 0;
  }
`;

export const StyledArrow = styled.span`
  color: ${({ theme }) => theme.palette.DARK_SOFT};
  font-weight: 600;
  margin-bottom: 3px;
  ${smallDevicesTextCSS}
  @media only screen and (min-width: 600px) {
    margin-bottom: 0;
  }
`;
