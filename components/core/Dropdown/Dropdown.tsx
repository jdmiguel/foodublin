import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  Dispatch,
} from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { useWindowMeasurement } from '../../hooks/useWindowMeasurement';

import {
  StyledDropdown,
  StyledLabel,
  StyledLabelButton,
  StyledListbox,
  StyledCloseButton,
  StyledMobileHeading,
  StyledMobileHeadingText,
  StyledMobileHeadingButton,
  StyledListboxItem,
  StyledListboxItemIcon,
  StyledListboxItemText,
} from './styles';

import { ListItem } from '@helpers/types';

type ListItemWithIsActive = ListItem & { isActive: boolean };

type DropdownProps = {
  className?: string;
  icon?: string;
  labelTxt: string;
  list: ListItem[];
  disabled: boolean;
  onSelect: (path: string) => void;
  onClear: () => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
};

type ListAction = { type: 'select'; id: number } | { type: 'clear' };

const listReducer = (list: ListItem[], action: ListAction) => {
  switch (action.type) {
    case 'select':
      return list.map((listItem: ListItem) => ({
        ...listItem,
        isActive: action.id === listItem.id,
      }));
    case 'clear':
      return list.map((listItem: ListItem) => ({
        ...listItem,
        isActive: false,
      }));
  }
};

export const Dropdown: React.FC<DropdownProps> = ({
  icon,
  labelTxt,
  list,
  className,
  disabled,
  onSelect,
  onClear,
  onFocus,
  onBlur,
}) => {
  const listWithIsActiveProp = list.map((listItem) => ({
    ...listItem,
    isActive: false,
  }));
  const [initialListState, dispatch]: [
    ListItem[],
    Dispatch<ListAction>,
  ] = useReducer(listReducer, listWithIsActiveProp);
  const { width } = useWindowMeasurement();
  const bodyLockIsAllowed = width < 768;

  const listRef = useRef<HTMLDivElement>(null);
  const [currentLabelTxt, setCurrentLabelTxt] = useState(labelTxt);
  const [selectedId, setSelectedId] = useState(0);
  const [isClearable, setIsClearable] = useState(false);
  const [isListboxFocused, setIsListboxFocused] = useState(false);

  useEffect(() => {
    if (isListboxFocused && listRef.current) {
      listRef.current?.focus();
      bodyLockIsAllowed && disableBodyScroll(listRef.current);
    } else if (!isListboxFocused && listRef.current) {
      bodyLockIsAllowed && enableBodyScroll(listRef.current);
    }
  }, [isListboxFocused, bodyLockIsAllowed]);

  useEffect(() => {
    if (isListboxFocused) {
      listRef.current?.focus();
    }
  }, [isListboxFocused]);

  useEffect(() => {
    if (selectedId) {
      setIsClearable(true);
    } else {
      setIsClearable(false);
      setCurrentLabelTxt(labelTxt);
    }
  }, [selectedId, labelTxt]);

  const handleSelect = (name: string, id: number, path: string) => {
    setCurrentLabelTxt(name);
    setSelectedId(id);

    dispatch({ type: 'select', id });
    setIsListboxFocused(false);

    onSelect && onSelect(path);
  };

  const handleFocus = (event: React.FocusEvent) => {
    onFocus && onFocus(event);
  };

  const handleBlur = (event: React.FocusEvent) => {
    setIsListboxFocused(false);
    onBlur && onBlur(event);
  };

  return (
    <StyledDropdown
      data-testid="dropdown"
      className={className}
      disabled={disabled}
    >
      <StyledLabel>
        <StyledLabelButton
          type="button"
          clearable={isClearable}
          onClick={() => setIsListboxFocused(true)}
        >
          {icon && (
            <i data-testid={'label-icon'} className="material-icons">
              {icon}
            </i>
          )}
          <span>{currentLabelTxt}</span>
          {!selectedId && <i className="material-icons">arrow_drop_down</i>}
        </StyledLabelButton>
        {isClearable && selectedId > 0 && (
          <StyledCloseButton
            type="button"
            onClick={() => {
              dispatch({ type: 'clear' });
              setSelectedId(0);
              onClear();
            }}
          >
            <i className="material-icons">close</i>
          </StyledCloseButton>
        )}
      </StyledLabel>
      <StyledListbox
        role="listbox"
        ref={listRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        data-testid="dropdown-list"
        isListboxFocused={isListboxFocused}
      >
        <StyledMobileHeading>
          <StyledMobileHeadingText text={labelTxt} />
          <StyledMobileHeadingButton
            type="button"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              event.preventDefault();
              setIsListboxFocused(false);
            }}
          >
            <i className="material-icons">close</i>
          </StyledMobileHeadingButton>
        </StyledMobileHeading>
        {initialListState.map((listItem: ListItemWithIsActive) => (
          <StyledListboxItem
            key={listItem.name}
            role="option"
            onClick={() =>
              handleSelect(listItem.name, listItem.id, listItem.path)
            }
          >
            {listItem.iconSrc && (
              <StyledListboxItemIcon
                src={listItem.iconSrc}
                alt={listItem.name}
              />
            )}
            <StyledListboxItemText isActive={listItem.isActive}>
              {listItem.name}
            </StyledListboxItemText>
          </StyledListboxItem>
        ))}
      </StyledListbox>
    </StyledDropdown>
  );
};
