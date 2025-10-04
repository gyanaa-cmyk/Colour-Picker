import styled from 'styled-components';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  hasError?: boolean;
}

const StyledInput = styled.input<{
  hasError?: boolean;
}>`
  padding: 8px;
  border: 1px solid ${(props) => (props.hasError ? 'red' : '#ccc')};
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    border-color: ${(props) => (props.hasError ? 'red' : '#007bff')};
    outline: none;
  }
`;

const Input: React.FC<InputProps> = ({ hasError, ...props }) => {
  return <StyledInput hasError={hasError} {...props} />;
};

export default Input;
