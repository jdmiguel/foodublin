import { useReducer, Dispatch } from 'react';
import { Filter } from '../../core/Filter/Filter';
import { FilterData, FilterType } from '../../core/types';
import { StyledFilters } from './styles';

type FilterProps = {
  className?: string;
  data: FilterData[];
  onClick: (filter?: FilterType) => void;
};

type DataAction = { type: 'select'; id: number } | { type: 'clear' };

const dataReducer = (data: FilterData[], action: DataAction) => {
  switch (action.type) {
    case 'select':
      return data.map((dataItem) => ({
        ...dataItem,
        isActive: action.id === dataItem.id,
      }));
    case 'clear':
      return data.map((dataItem) => ({
        ...dataItem,
        isActive: false,
      }));
  }
};

export const Filters: React.FC<FilterProps> = ({ data, onClick }) => {
  const dataWithIsActiveProp = data.map((dataItem) => ({
    ...dataItem,
    isActive: false,
  }));
  const [dataState, dispatch]: [FilterData[], Dispatch<DataAction>] = useReducer(
    dataReducer,
    dataWithIsActiveProp,
  );

  const handleClick = (isActive: boolean, id: number, filter: FilterType) => {
    dispatch(!isActive ? { type: 'select', id } : { type: 'clear' });
    onClick(!isActive ? filter : undefined);
  };

  return (
    <StyledFilters data-testid="filters">
      {dataState.map((item) => (
        <Filter
          key={item.id}
          data={item}
          onClick={() => {
            handleClick(item.isActive, item.id, item.type);
          }}
        />
      ))}
    </StyledFilters>
  );
};
