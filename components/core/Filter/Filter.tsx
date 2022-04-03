import {
  StyledFilter,
  StyledFilterPrimaryText,
  StyledFilterSecondaryText,
  StyledFilterIcon,
} from './styles';
import { FilterData } from '../types';

type FilterProps = {
  className?: string;
  data: FilterData;
  onClick: (sort: string, order: string) => void;
};

export const Filter: React.FC<FilterProps> = ({ data, onClick }) => {
  return (
    <StyledFilter
      isActive={data.isActive}
      key={data.id}
      onClick={() => {
        onClick(data.sort, data.order);
      }}
    >
      <StyledFilterPrimaryText>{data.primaryText}</StyledFilterPrimaryText>
      <StyledFilterSecondaryText>{` ${data.secondaryText}`}</StyledFilterSecondaryText>
      <StyledFilterIcon className="material-icons">{data.icon}</StyledFilterIcon>
    </StyledFilter>
  );
};
