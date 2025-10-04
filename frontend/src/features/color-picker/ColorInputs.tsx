import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useColorStore } from '../../store/useColorStore';
import HexInput from './HexInput';
import RgbInput from './RgbInput';
import HslInput from './HslInput';
import ColorPreview from './ColorPreview';
import { hexToRgb, rgbToHex, hslToRgb, rgbToHsl } from '../../utils/color-conversions';

const ColorInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
`;

const InputsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ColorInputs: React.FC = () => {
  const { activeColor, setActiveColor } = useColorStore();

  const rgb = hexToRgb(activeColor) || { r: 255, g: 255, b: 255 };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const handleHexChange = (hex: string) => {
    setActiveColor(hex);
  };

  const handleRgbChange = (r: number, g: number, b: number) => {
    setActiveColor(rgbToHex(r, g, b));
  };

  const handleHslChange = (h: number, s: number, l: number) => {
    const newRgb = hslToRgb(h, s, l);
    setActiveColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  return (
    <ColorInputsContainer>
      <ColorPreview color={activeColor} />
      <InputsGroup>
        <HexInput hex={activeColor} onChange={handleHexChange} />
        <RgbInput r={rgb.r} g={rgb.g} b={rgb.b} onChange={handleRgbChange} />
        <HslInput h={hsl.h} s={hsl.s} l={hsl.l} onChange={handleHslChange} />
      </InputsGroup>
    </ColorInputsContainer>
  );
};

export default ColorInputs;
