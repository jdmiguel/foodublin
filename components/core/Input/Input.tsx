import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

type InputTypes =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'url';

export type InputProps = {
  type: InputTypes;
  withSearchIcon?: boolean;
  className?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  id?: string;
  step?: number;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  active?: boolean;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
};

const StyledInputWrapper = styled.div`
  width: 100%;
  max-width: 550px;
  border-radius: 4px;
  padding: 0 10px;
  background: ${(props) => props.theme.palette.LIGHT_MAX};
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 1.2rem;
    color: ${(props) => props.theme.palette.DARK_SOFT};
    margin-right: 10px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 55px;
  padding: 10px 0;
  line-height: 20px;
  border: none;
  outline: none;
  color: ${(props) => props.theme.palette.DARK_MAX};
  background: transparent;
`;

const Input: React.FC<InputProps> = ({
  type,
  withSearchIcon,
  className,
  value,
  placeholder,
  disabled,
  readOnly,
  name,
  id,
  step,
  autoComplete,
  maxLength,
  minLength,
  onClick,
  onChange,
  onFocus,
  onBlur,
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
    onChange && onChange(event);
  };

  return (
    <StyledInputWrapper
      onClick={() => onClick && onClick()}
      data-testid={'input-wrapper'}
      className={className}
    >
      {withSearchIcon && (
        <i data-testid={'input-icon'} className="material-icons">
          search
        </i>
      )}
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={currentValue}
        disabled={disabled}
        readOnly={readOnly}
        name={name}
        id={id ? id : name}
        ref={inputRef}
        step={step}
        autoComplete={autoComplete}
        maxLength={maxLength}
        minLength={minLength}
        onChange={handleChange}
        onFocus={(event: React.FocusEvent) => {
          onFocus && onFocus(event);
        }}
        onBlur={(event: React.FocusEvent) => {
          onBlur && onBlur(event);
        }}
      />
    </StyledInputWrapper>
  );
};

export default Input;
