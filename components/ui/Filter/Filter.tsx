import React, { useReducer, Dispatch } from 'react';
import styled from 'styled-components';

import { FilterSort, FilterOrder } from '../../../helpers/staticData';

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

const StyledFilterItem = styled.button<{ isActive: boolean }>`
  width: 144px;
  padding: 15px 8px;
  margin: 0 8px 15px;
  border: 1px solid ${({ theme }) => theme.palette.DARK_MIN};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.palette.DARK_MEDIUM};
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  transition: background-color 0.2s ease-out;
  background-color: ${({ theme, isActive }) =>
    `${isActive ? theme.palette.PRIMARY_LIGHT : theme.palette.LIGHT_MIN}`};
  &:hover {
    background-color: ${({ theme }) => theme.palette.PRIMARY_LIGHT};
  }
  @media only screen and (min-width: 400px) {
    width: 180px;
  }
  @media only screen and (min-width: 480px) {
    width: 200px;
    margin: 0 10px 15px;
  }
  @media only screen and (min-width: 680px) {
    width: 250px;
  }
  @media only screen and (min-width: 768px) {
    width: auto;
    margin: 0;
    padding: 15px;
    font-size: 1rem;
  }
  @media only screen and (min-width: 992px) {
    padding: 20px;
  }
`;

const StyledFilterPrimaryText = styled.span`
  text-transform: uppercase;
`;

const StyledFilterSecondaryText = styled.span`
  display: none;
  @media only screen and (min-width: 920px) {
    display: block;
  }
`;

const StyledFilterIcon = styled.i`
  font-size: 1.1rem;
  line-height: 18px;
  margin-left: 10px;
  display: block;
  @media only screen and (min-width: 920px) {
    display: none;
  }
`;

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

const Filter: React.FC<FilterProps> = ({ onClick, data }) => {
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

export default Filter;
