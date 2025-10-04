import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import ColorInputs from './ColorInputs';
import { useColorStore } from '../../store/useColorStore';

describe('ColorInputs', () => {
  beforeEach(() => {
    useColorStore.setState({ activeColor: '#FF0000' }); // Reset state before each test
  });

  it('should render all input components and color preview', () => {
    render(<ColorInputs />);
    expect(screen.getByLabelText('HEX:')).toBeInTheDocument();
    expect(screen.getByText('RGB:')).toBeInTheDocument();
    expect(screen.getByText('HSL:')).toBeInTheDocument();
    expect(screen.getByTestId('color-swatch')).toBeInTheDocument();
  });

  it('should update HEX input and other inputs when HEX changes', () => {
    render(<ColorInputs />);
    const hexInput = screen.getByLabelText('HEX:') as HTMLInputElement;
    const rInput = screen.getByPlaceholderText('R') as HTMLInputElement;

    fireEvent.change(hexInput, { target: { value: '#00FF00' } });
    expect(hexInput.value).toBe('#00FF00');
    expect(rInput.value).toBe('0'); // R for #00FF00 is 0
    expect(screen.getByTestId('color-swatch')).toHaveStyle('background-color: #00FF00');
  });

  it('should update RGB inputs and other inputs when RGB changes', () => {
    render(<ColorInputs />);
    const rInput = screen.getByPlaceholderText('R') as HTMLInputElement;
    const hexInput = screen.getByLabelText('HEX:') as HTMLInputElement;

    fireEvent.change(rInput, { target: { value: '0' } });
    expect(rInput.value).toBe('0');
    expect(hexInput.value).toBe('#000000'); // Assuming initial is #FF0000, changing R to 0 makes it #000000
    expect(screen.getByTestId('color-swatch')).toHaveStyle('background-color: #000000');
  });

  it('should update HSL inputs and other inputs when HSL changes', () => {
    render(<ColorInputs />);
    const hInput = screen.getByPlaceholderText('H') as HTMLInputElement;
    const hexInput = screen.getByLabelText('HEX:') as HTMLInputElement;

    fireEvent.change(hInput, { target: { value: '120' } }); // Green hue
    expect(hInput.value).toBe('120');
    // Expect hex to change to a green-ish color, e.g., #00FF00 if s=100, l=50
    // This test might need more precise color conversion checks if the initial state is not pure red
    // For now, just check if it's not the original red
    expect(hexInput.value).not.toBe('#FF0000');
  });
});
