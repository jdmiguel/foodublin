import { StyledFilter, StyledFilterText, StyledFilterIcon } from './styles';
import { FilterData, FilterType } from '../types';

type FilterProps = {
  className?: string;
  data: FilterData;
  onClick: (filter: FilterType) => void;
};

export const Filter: React.FC<FilterProps> = ({
  data: { isActive, type, text, icon },
  onClick,
}) => (
  <StyledFilter isActive={isActive} onClick={() => onClick(type)}>
    <StyledFilterIcon className="material-icons">{icon}</StyledFilterIcon>
    <StyledFilterText>{text}</StyledFilterText>
  </StyledFilter>
);
