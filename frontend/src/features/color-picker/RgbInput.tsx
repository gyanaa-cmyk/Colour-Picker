import React, { useState, useEffect } from 'react';
import Input from '../../components/common/Input';
import styled from 'styled-components';

interface RgbInputProps {
  r: number;
  g: number;
  b: number;
  onChange: (r: number, g: number, b: number) => void;
}

const RgbInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RgbInput: React.FC<RgbInputProps> = ({ r, g, b, onChange }) => {
  const [rValue, setRValue] = useState(String(r));
  const [gValue, setGValue] = useState(String(g));
  const [bValue, setBValue] = useState(String(b));

  useEffect(() => {
    setRValue(String(r));
    setGValue(String(g));
    setBValue(String(b));
  }, [r, g, b]);

  const validateAndChange = (value: string, setter: React.Dispatch<React.SetStateAction<string>>, currentR: string, currentG: string, currentB: string, colorPart: 'r' | 'g' | 'b') => {
    setter(value);
    const numValue = parseInt(value, 10);
    const isValid = !isNaN(numValue) && numValue >= 0 && numValue <= 255;

    if (isValid) {
      const newR = colorPart === 'r' ? numValue : parseInt(currentR, 10);
      const newG = colorPart === 'g' ? numValue : parseInt(currentG, 10);
      const newB = colorPart === 'b' ? numValue : parseInt(currentB, 10);
      onChange(newR, newG, newB);
    }
  };

  return (
    <RgbInputContainer>
      <label>RGB:</label>
      <Input
        value={rValue}
        onChange={(e) => validateAndChange(e.target.value, setRValue, e.target.value, gValue, bValue, 'r')}
        type="number"
        placeholder="R"
        min="0"
        max="255"
        hasError={!/^\d+$/.test(rValue) || parseInt(rValue, 10) < 0 || parseInt(rValue, 10) > 255}
      />
      <Input
        value={gValue}
        onChange={(e) => validateAndChange(e.target.value, setGValue, rValue, e.target.value, bValue, 'g')}
        type="number"
        placeholder="G"
        min="0"
        max="255"
        hasError={!/^\d+$/.test(gValue) || parseInt(gValue, 10) < 0 || parseInt(gValue, 10) > 255}
      />
      <Input
        value={bValue}
        onChange={(e) => validateAndChange(e.target.value, setBValue, rValue, gValue, e.target.value, 'b')}
        type="number"
        placeholder="B"
        min="0"
        max="255"
        hasError={!/^\d+$/.test(bValue) || parseInt(bValue, 10) < 0 || parseInt(bValue, 10) > 255}
      />
    </RgbInputContainer>
  );
};

export default RgbInput;
