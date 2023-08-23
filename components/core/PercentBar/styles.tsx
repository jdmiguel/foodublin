import styled from 'styled-components';

export const StyledPercentBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledPercentBar = styled.span<{ percent: number }>`
  background-color: ${({ theme }) => theme.palette.LIGHT_MIN};
  position: relative;
  height: 16px;
  width: 100%;
  display: block;
  &:after {
    background-color: ${({ theme }) => theme.palette.PRIMARY};
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ percent }) => `${percent}%`};
  }
`;

export const StyledPercentLegend = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.palette.DARK_MIN};
`;
