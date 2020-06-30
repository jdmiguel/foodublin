import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useReducer,
  Dispatch,
} from 'react';
import styled from 'styled-components';

type ListItemType = {
  iconSrc?: string;
  id: number;
  name: string;
};

type ListItemTypeWithIsActive = ListItemType & { isActive: boolean };

type DropdownProps = {
  className?: string;
  withIcon?: string;
  labelTxt: string;
  clearable?: boolean;
  list: ListItemType[];
  onSelect: (id: number) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
};

type ListAction = { type: 'select'; id: number } | { type: 'clear' };

const StyledDropdown = styled.div`
  width: 100%;
  max-width: 550px;
  height: 100%;
  position: initial;
  @media only screen and (min-width: 768px) {
    height: 55px;
    position: relative;
  }
`;

const StyledLabel = styled.div`
  position: relative;
  border-radius: 4px;
  background-color: ${(props) => props.theme.palette.LIGHT_MAX};
  cursor: pointer;
`;

const StyledLabelButton = styled.button`
  width: 100%;
  height: 55px;
  background-color: ${(props) => props.theme.palette.LIGHT_MAX};
  line-height: 55px;
  padding: 0 4px 0 8px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s ease-out;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  i {
    &:first-of-type {
      font-size: 1rem;
      margin-left: 5px;
      margin-right: 10px;
      color: ${(props) => props.theme.palette.PRIMARY_DARK};
    }
  }
  &:not(.clearable) {
    i {
      &:last-of-type {
        position: absolute;
        z-index: 1;
        top: 14px;
        right: 7px;
        font-size: 1.7rem;
      }
    }
  }
  &.clearable {
    background-color: ${(props) => props.theme.palette.PRIMARY_LIGHT};
  }
  &:hover {
    background-color: ${(props) => props.theme.palette.PRIMARY_LIGHT};
  }
  &:focus {
    background-color: ${(props) => props.theme.palette.PRIMARY_LIGHT};
  }
`;

const StyledListbox = styled.div`
  display: none;
  position: absolute;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.palette.LIGHT_MAX};
  z-index: 2;
  overflow: auto;
  top: 0;
  left: 0;
  padding: 50px 10px 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.35);
  border: 1px solid ${(props) => props.theme.palette.LIGHT_MAX};
  border-radius: 4px;
  border-top: 0;
  border-bottom: 0;
  outline: none;
  &.active {
    display: block;
  }
  @media only screen and (min-width: 768px) {
    height: auto;
    padding: 0;
    max-height: 440px;
  }
`;

const StyledClearButton = styled.button`
  position: absolute;
  z-index: 1;
  top: 19px;
  right: 7px;
  cursor: pointer;
  outline: none;
  transition: opacity 0.2s ease-out;
  background-color: transparent;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  i {
    font-size: 1.1rem;
    font-weight: bold;
  }
  &:hover {
    opacity: 0.5;
  }
`;

const StyledCloseButton = styled(StyledClearButton)`
  display: block;
  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const StyledListboxItem = styled.div`
  width: 100%;
  height: 55px;
  border-bottom: 1px solid ${(props) => props.theme.palette.LIGHT_MIN};
  list-style: none;
  display: block;
  overflow: hidden;
  text-decoration: none;
  padding: 9px 11px;
  color: ${(props) => props.theme.palette.DARK_MAX};
  display: flex;
  align-items: center;
  font-weight: 400;
  width: 100%;
  transition: background-color 0.2s ease-out;
  cursor: pointer;
  &.active {
    p {
      font-weight: 600;
    }
  }
  &:hover {
    background-color: ${(props) => props.theme.palette.PRIMARY_LIGHT};
  }
  &:focus {
    background-color: ${(props) => props.theme.palette.PRIMARY_LIGHT};
  }
`;

const StyledListboxItemIcon = styled.img`
  width: 18px;
  margin-right: 12px;
`;

const StyledListboxItemText = styled.p`
  color: ${(props) => props.theme.palette.DARK_MAX};
  font-size: 0.9rem;
`;

const listReducer = (list: ListItemType[], action: ListAction) => {
  switch (action.type) {
    case 'select':
      return list.map((listItem: ListItemType) => ({
        ...listItem,
        isActive: action.id === listItem.id,
      }));
    case 'clear':
      return list.map((listItem: ListItemType) => ({
        ...listItem,
        isActive: false,
      }));
  }
};

const Dropdown: React.FC<DropdownProps> = ({
  className,
  withIcon,
  labelTxt,
  list,
  clearable,
  onSelect,
  onFocus,
  onBlur,
}) => {
  const listWithIsActiveProp = list.map((listItem) => ({
    ...listItem,
    isActive: false,
  }));
  const [initialListState, dispatch]: [
    ListItemType[],
    Dispatch<ListAction>,
  ] = useReducer(listReducer, listWithIsActiveProp);
  const listRef = useRef<HTMLDivElement>(null);
  const [currentLabelTxt, setCurrentLabelTxt] = useState(labelTxt);
  const [selectedId, setSelectedId] = useState(0);
  const [labelButtonClassName, setLabelButtonClassName] = useState('');
  const [listClassName, setListClassName] = useState('');

  useLayoutEffect(() => {
    if (listClassName === 'active') {
      listRef.current?.focus();
    }
  }, [listClassName]);

  useEffect(() => {
    if (!selectedId) {
      setLabelButtonClassName('');
      setCurrentLabelTxt(labelTxt);
    } else {
      setLabelButtonClassName('clearable');
    }
  }, [selectedId, labelTxt]);

  const handleSelect = (name: string, id: number) => {
    setCurrentLabelTxt(name);
    setSelectedId(id);

    dispatch({ type: 'select', id });
    setListClassName('');

    onSelect && onSelect(id);
  };

  const handleFocus = (event: React.FocusEvent) => {
    onFocus && onFocus(event);
  };

  const handleBlur = (event: React.FocusEvent) => {
    setListClassName('');
    onBlur && onBlur(event);
  };

  return (
    <StyledDropdown data-testid="dropdown" role="listbox" className={className}>
      <StyledLabel>
        <StyledLabelButton
          type="button"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault();
            setListClassName('active');
          }}
          className={labelButtonClassName}
        >
          {withIcon && (
            <i data-testid={'label-icon'} className="material-icons">
              {withIcon}
            </i>
          )}
          <span>{currentLabelTxt}</span>
          {!selectedId && <i className="material-icons">arrow_drop_down</i>}
        </StyledLabelButton>
        {clearable && selectedId > 0 && (
          <StyledClearButton
            type="button"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              event.preventDefault();
              dispatch({ type: 'clear' });
              setSelectedId(0);
            }}
          >
            <i className="material-icons">close</i>
          </StyledClearButton>
        )}
      </StyledLabel>
      <StyledListbox
        role="list"
        ref={listRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        data-testid="dropdown-list"
        className={listClassName}
      >
        <StyledCloseButton
          type="button"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault();
            setListClassName('');
          }}
        >
          <i className="material-icons">close</i>
        </StyledCloseButton>
        {initialListState.map((listItem: ListItemTypeWithIsActive) => (
          <StyledListboxItem
            key={listItem.name}
            role="listitem"
            onClick={() => handleSelect(listItem.name, listItem.id)}
            className={listItem.isActive ? 'active' : ''}
          >
            {listItem.iconSrc && (
              <StyledListboxItemIcon
                src={listItem.iconSrc}
                alt={listItem.name}
              />
            )}
            <StyledListboxItemText>{listItem.name}</StyledListboxItemText>
          </StyledListboxItem>
        ))}
      </StyledListbox>
    </StyledDropdown>
  );
};

export default Dropdown;
