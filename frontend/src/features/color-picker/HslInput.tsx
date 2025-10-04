import React, { useState, useEffect } from 'react';
import Input from '../../components/common/Input';
import styled from 'styled-components';

interface HslInputProps {
  h: number;
  s: number;
  l: number;
  onChange: (h: number, s: number, l: number) => void;
}

const HslInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HslInput: React.FC<HslInputProps> = ({ h, s, l, onChange }) => {
  const [hValue, setHValue] = useState(String(h));
  const [sValue, setSValue] = useState(String(s));
  const [lValue, setLValue] = useState(String(l));

  useEffect(() => {
    setHValue(String(h));
    setSValue(String(s));
    setLValue(String(l));
  }, [h, s, l]);

  const validateAndChange = (value: string, setter: React.Dispatch<React.SetStateAction<string>>, currentH: string, currentS: string, currentL: string, colorPart: 'h' | 's' | 'l') => {
    setter(value);
    const numValue = parseInt(value, 10);
    let isValid = !isNaN(numValue);

    if (colorPart === 'h') {
      isValid = isValid && numValue >= 0 && numValue <= 360;
    } else { // s and l
      isValid = isValid && numValue >= 0 && numValue <= 100;
    }

    if (isValid) {
      const newH = colorPart === 'h' ? numValue : parseInt(currentH, 10);
      const newS = colorPart === 's' ? numValue : parseInt(currentS, 10);
      const newL = colorPart === 'l' ? numValue : parseInt(currentL, 10);
      onChange(newH, newS, newL);
    }
  };

  return (
    <HslInputContainer>
      <label>HSL:</label>
      <Input
        value={hValue}
        onChange={(e) => validateAndChange(e.target.value, setHValue, e.target.value, sValue, lValue, 'h')}
        type="number"
        placeholder="H"
        min="0"
        max="360"
        hasError={!/^\d+$/.test(hValue) || parseInt(hValue, 10) < 0 || parseInt(hValue, 10) > 360}
      />
      <Input
        value={sValue}
        onChange={(e) => validateAndChange(e.target.value, setSValue, hValue, e.target.value, lValue, 's')}
        type="number"
        placeholder="S"
        min="0"
        max="100"
        hasError={!/^\d+$/.test(sValue) || parseInt(sValue, 10) < 0 || parseInt(sValue, 10) > 100}
      />
      <Input
        value={lValue}
        onChange={(e) => validateAndChange(e.target.value, setLValue, hValue, sValue, e.target.value, 'l')}
        type="number"
        placeholder="L"
        min="0"
        max="100"
        hasError={!/^\d+$/.test(lValue) || parseInt(lValue, 10) < 0 || parseInt(lValue, 10) > 100}
      />
    </HslInputContainer>
  );
};

export default HslInput;
