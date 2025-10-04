import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RgbInput from './RgbInput';

describe('RgbInput', () => {
  it('should render with the correct initial RGB values', () => {
    const handleChange = vi.fn();
    render(<RgbInput r={255} g={0} b={0} onChange={handleChange} />);
    const rInput = screen.getByPlaceholderText('R') as HTMLInputElement;
    const gInput = screen.getByPlaceholderText('G') as HTMLInputElement;
    const bInput = screen.getByPlaceholderText('B') as HTMLInputElement;

    expect(rInput).toBeInTheDocument();
    expect(rInput.value).toBe('255');
    expect(gInput.value).toBe('0');
    expect(bInput.value).toBe('0');
  });

  it('should call onChange with valid RGB values when R changes', () => {
    const handleChange = vi.fn();
    render(<RgbInput r={255} g={0} b={0} onChange={handleChange} />);
    const rInput = screen.getByPlaceholderText('R');
    fireEvent.change(rInput, { target: { value: '100' } });
    expect(handleChange).toHaveBeenCalledWith(100, 0, 0);
  });

  it('should not call onChange with invalid RGB values (out of range)', () => {
    const handleChange = vi.fn();
    render(<RgbInput r={255} g={0} b={0} onChange={handleChange} />);
    const rInput = screen.getByPlaceholderText('R');
    fireEvent.change(rInput, { target: { value: '300' } });
    expect(handleChange).not.toHaveBeenCalled();
    expect(rInput).toHaveStyle('border: 1px solid red');
  });

  it('should update input values when r, g, b props change', () => {
    const handleChange = vi.fn();
    const { rerender } = render(<RgbInput r={255} g={0} b={0} onChange={handleChange} />);
    const rInput = screen.getByPlaceholderText('R') as HTMLInputElement;
    const gInput = screen.getByPlaceholderText('G') as HTMLInputElement;
    const bInput = screen.getByPlaceholderText('B') as HTMLInputElement;

    expect(rInput.value).toBe('255');
    expect(gInput.value).toBe('0');
    expect(bInput.value).toBe('0');

    rerender(<RgbInput r={0} g={255} b={0} onChange={handleChange} />);

    expect(rInput.value).toBe('0');
    expect(gInput.value).toBe('255');
    expect(bInput.value).toBe('0');
  });
});
