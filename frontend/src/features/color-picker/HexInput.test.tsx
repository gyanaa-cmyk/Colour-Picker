import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HexInput from './HexInput';

describe('HexInput', () => {
  it('should render with the correct initial HEX value', () => {
    const handleChange = vi.fn();
    render(<HexInput hex="#FF0000" onChange={handleChange} />);
    const inputElement = screen.getByLabelText('HEX:') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe('#FF0000');
  });

  it('should call onChange with a valid HEX value', () => {
    const handleChange = vi.fn();
    render(<HexInput hex="#FF0000" onChange={handleChange} />);
    const inputElement = screen.getByLabelText('HEX:');
    fireEvent.change(inputElement, { target: { value: '#00FF00' } });
    expect(handleChange).toHaveBeenCalledWith('#00FF00');
  });

  it('should not call onChange with an invalid HEX value', () => {
    const handleChange = vi.fn();
    render(<HexInput hex="#FF0000" onChange={handleChange} />);
    const inputElement = screen.getByLabelText('HEX:');
    fireEvent.change(inputElement, { target: { value: '#INVALID' } });
    expect(handleChange).not.toHaveBeenCalled();
    expect(inputElement).toHaveStyle('border: 1px solid red');
  });

  it('should update input value when hex prop changes', () => {
    const handleChange = vi.fn();
    const { rerender } = render(<HexInput hex="#FF0000" onChange={handleChange} />);
    const inputElement = screen.getByLabelText('HEX:') as HTMLInputElement;
    expect(inputElement.value).toBe('#FF0000');

    rerender(<HexInput hex="#0000FF" onChange={handleChange} />);
    expect(inputElement.value).toBe('#0000FF');
  });
});
