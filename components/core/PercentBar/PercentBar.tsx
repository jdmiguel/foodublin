import { StyledPercentBarWrapper, StyledPercentBar, StyledPercentLegend } from './styles';

type PercentBarLegend = {
  initial: string;
  end: string;
};

type PercentBarProps = {
  percent: number;
  legend: PercentBarLegend;
};

export const PercentBar: React.FC<PercentBarProps> = ({ percent, legend: { initial, end } }) => (
  <StyledPercentBarWrapper>
    <StyledPercentBar percent={percent} />
    <StyledPercentLegend>
      <span>{initial}</span>
      <span>{end}</span>
    </StyledPercentLegend>
  </StyledPercentBarWrapper>
);
