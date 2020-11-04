import React, { useReducer, Dispatch } from 'react';

import {
  StyledFilterItem,
  StyledFilterPrimaryText,
  StyledFilterSecondaryText,
  StyledFilterIcon,
} from './styles';

import { FilterSort, FilterOrder } from '@helpers/staticData';

type FilterData = {
  primaryText: string;
  secondaryText: string;
  icon: string;
  sort: FilterSort.COST | FilterSort.RANK;
  order: FilterOrder.ASC | FilterOrder.DESC;
  id: number;
};

type FilterDataItemTypeWithIsActive = FilterData & { isActive: boolean };

type FilterProps = {
  className?: string;
  onClick: (sort: string, order: string) => void;
  data: FilterData[];
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

export const Filter: React.FC<FilterProps> = ({ onClick, data }) => {
  const dataWithIsActiveProp = data.map((dataItem) => ({
    ...dataItem,
    isActive: false,
  }));
  const [dataState, dispatch]: [
    FilterDataItemTypeWithIsActive[],
    Dispatch<DataAction>,
  ] = useReducer(dataReducer, dataWithIsActiveProp);

  const handleClick = (
    isActive: boolean,
    id: number,
    sort: string,
    order: string,
  ) => {
    dispatch(!isActive ? { type: 'select', id } : { type: 'clear' });
    onClick(!isActive ? sort : '', !isActive ? order : '');
  };

  return (
    <div className="grid-x grid-margin-x">
      {dataState.map((item) => (
        <StyledFilterItem
          isActive={item.isActive}
          className="cell small-6 medium-3 large-3"
          key={item.id}
          onClick={() => {
            handleClick(item.isActive, item.id, item.sort, item.order);
          }}
        >
          <StyledFilterPrimaryText>{item.primaryText}</StyledFilterPrimaryText>
          <StyledFilterSecondaryText>
            {` ${item.secondaryText}`}
          </StyledFilterSecondaryText>
          <StyledFilterIcon className="material-icons">
            {item.icon}
          </StyledFilterIcon>
        </StyledFilterItem>
      ))}
    </div>
  );
};
