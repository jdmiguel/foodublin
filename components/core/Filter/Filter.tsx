import { StyledFilter, StyledFilterText, StyledFilterIcon } from './styles';
import { FilterData, FilterType } from '../types';

type FilterProps = {
  className?: string;
  data: FilterData;
  onClick: (filter: FilterType) => void;
};

export const Filter: React.FC<FilterProps> = ({
  data: { isActive, text, icon, type },
  onClick,
}) => (
  <StyledFilter isActive={isActive} onClick={() => onClick(type)}>
    <StyledFilterText>{text}</StyledFilterText>
    <StyledFilterIcon className="material-icons">{icon}</StyledFilterIcon>
  </StyledFilter>
);
