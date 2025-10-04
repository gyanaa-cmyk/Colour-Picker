import React, { useState, useEffect } from 'react';
import Input from '../../components/common/Input';
import styled from 'styled-components';

interface HexInputProps {
  hex: string;
  onChange: (hex: string) => void;
}

const HexInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HexInput: React.FC<HexInputProps> = ({ hex, onChange }) => {
  const [inputValue, setInputValue] = useState(hex);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setInputValue(hex);
    setIsValid(/^#?([0-9a-fA-F]{3}){1,2}$/.test(hex));
  }, [hex]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const newIsValid = /^#?([0-9a-fA-F]{3}){1,2}$/.test(value);
    setIsValid(newIsValid);
    if (newIsValid) {
      onChange(value);
    }
  };

  return (
    <HexInputContainer>
      <label htmlFor="hex-input">HEX:</label>
      <Input
        id="hex-input"
        value={inputValue}
        onChange={handleChange}
        placeholder="#RRGGBB"
        hasError={!isValid}
      />
    </HexInputContainer>
  );
};

export default HexInput;
