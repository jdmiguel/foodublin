import { useState, useRef, useEffect } from 'react';
import { StyledInputWrapper, StyledInput } from './styles';

type InputTypes = 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url';

export type InputProps = {
  type: InputTypes;
  hasSearchIcon?: boolean;
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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<InputProps> = ({
  type,
  hasSearchIcon,
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

  const handleClick = () => {
    inputRef.current?.focus();
    onClick?.();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
    onChange?.(event);
  };

  return (
    <StyledInputWrapper onClick={handleClick} data-testid={'input-wrapper'} className={className}>
      {hasSearchIcon && (
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
        onFocus={(event: React.FocusEvent<HTMLInputElement>) => onFocus?.(event)}
        onBlur={(event: React.FocusEvent<HTMLInputElement>) => onBlur?.(event)}
      />
    </StyledInputWrapper>
  );
};
