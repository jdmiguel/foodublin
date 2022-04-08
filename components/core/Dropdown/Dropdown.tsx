import { useState, useRef, useEffect, useReducer, useCallback, Dispatch } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { BlockTitle } from '../BlockTitle/BlockTitle';
import { useWindowSize } from '../../hooks/useWindowSize';
import {
  StyledDropdown,
  StyledLabel,
  StyledLabelButton,
  StyledListbox,
  StyledCloseButton,
  StyledMobileHeading,
  StyledMobileHeadingButton,
  StyledListboxItem,
  StyledListboxItemIcon,
  StyledListboxItemText,
} from './styles';
import { MAX_MOBILE_WIDTH } from '@/store/statics';
import { ListItem } from '../types';

type DropdownProps = {
  className?: string;
  icon?: string;
  labelTxt: string;
  list: ListItem[];
  disabled: boolean;
  isReset: boolean;
  onSelect: (path: string) => void;
  onClear: () => void;
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
  isReset,
  onSelect,
  onClear,
}) => {
  const listWithIsActiveProp = list.map((listItem) => ({
    ...listItem,
    isActive: false,
  }));
  const [initialListState, dispatch]: [ListItem[], Dispatch<ListAction>] = useReducer(
    listReducer,
    listWithIsActiveProp,
  );
  const { windowWidth } = useWindowSize();
  const bodyLockIsAllowed = windowWidth < MAX_MOBILE_WIDTH;

  const listRef = useRef<HTMLUListElement>(null);
  const [currentLabelTxt, setCurrentLabelTxt] = useState(labelTxt);
  const [selectedId, setSelectedId] = useState(0);
  const [isClearable, setIsClearable] = useState(false);
  const [isListboxFocused, setIsListboxFocused] = useState(false);

  useEffect(() => {
    if (!listRef.current) {
      return;
    }

    if (isListboxFocused) {
      listRef.current.focus();
      bodyLockIsAllowed && disableBodyScroll(listRef.current);
      return;
    }

    bodyLockIsAllowed && enableBodyScroll(listRef.current);
  }, [isListboxFocused, bodyLockIsAllowed]);

  useEffect(() => {
    if (selectedId) {
      setIsClearable(true);
      return;
    }

    setIsClearable(false);
    setCurrentLabelTxt(labelTxt);
  }, [selectedId, labelTxt]);

  const handleClear = useCallback(() => {
    dispatch({ type: 'clear' });
    setSelectedId(0);
    onClear();
  }, [onClear]);

  useEffect(() => {
    if (isReset) {
      handleClear();
    }
  }, [isReset, handleClear]);

  const handleSelect = (name: string, id: number, path: string) => {
    setCurrentLabelTxt(name);
    setSelectedId(id);

    dispatch({ type: 'select', id });
    setIsListboxFocused(false);

    onSelect?.(path);
  };

  return (
    <StyledDropdown data-testid="dropdown" className={className} disabled={disabled}>
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
          <StyledCloseButton type="button" onClick={handleClear}>
            <i className="material-icons">close</i>
          </StyledCloseButton>
        )}
      </StyledLabel>
      <StyledListbox
        ref={listRef}
        onBlur={() => setIsListboxFocused(false)}
        tabIndex={0}
        data-testid="dropdown-list"
        isListboxFocused={isListboxFocused}
      >
        <StyledMobileHeading>
          <BlockTitle text={labelTxt} />
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
        {initialListState.map((listItem: ListItem) => (
          <StyledListboxItem
            key={listItem.name}
            onClick={() => handleSelect(listItem.name, listItem.id, listItem.path)}
          >
            {listItem.iconSrc && (
              <StyledListboxItemIcon src={listItem.iconSrc} alt={listItem.name} />
            )}
            <StyledListboxItemText isActive={listItem.isActive || false}>
              {listItem.name}
            </StyledListboxItemText>
          </StyledListboxItem>
        ))}
      </StyledListbox>
    </StyledDropdown>
  );
};
