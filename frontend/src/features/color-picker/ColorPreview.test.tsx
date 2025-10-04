import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ColorPreview from './ColorPreview';

describe('ColorPreview', () => {
  it('should render with the correct background color', () => {
    render(<ColorPreview color="#FF0000" />);
    const swatchElement = screen.getByTestId('color-swatch'); // Add data-testid to StyledColorSwatch
    expect(swatchElement).toBeInTheDocument();
    expect(swatchElement).toHaveStyle('background-color: #FF0000');
  });
});
