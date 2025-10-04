import styled from 'styled-components';
import React from 'react';

interface ColorPreviewProps {
  color: string;
}

const StyledColorSwatch = styled.div<{ color: string }>`
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  background-color: ${(props) => props.color};
  border-radius: 4px;
`;

const ColorPreview: React.FC<ColorPreviewProps> = ({ color }) => {
  return <StyledColorSwatch color={color} data-testid="color-swatch" />;
};

export default ColorPreview;
