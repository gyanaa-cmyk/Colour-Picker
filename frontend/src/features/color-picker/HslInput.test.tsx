import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HslInput from './HslInput';

describe('HslInput', () => {
  it('should render with the correct initial HSL values', () => {
    const handleChange = vi.fn();
    render(<HslInput h={0} s={100} l={50} onChange={handleChange} />);
    const hInput = screen.getByPlaceholderText('H') as HTMLInputElement;
    const sInput = screen.getByPlaceholderText('S') as HTMLInputElement;
    const lInput = screen.getByPlaceholderText('L') as HTMLInputElement;

    expect(hInput).toBeInTheDocument();
    expect(hInput.value).toBe('0');
    expect(sInput.value).toBe('100');
    expect(lInput.value).toBe('50');
  });

  it('should call onChange with valid HSL values when H changes', () => {
    const handleChange = vi.fn();
    render(<HslInput h={0} s={100} l={50} onChange={handleChange} />);
    const hInput = screen.getByPlaceholderText('H');
    fireEvent.change(hInput, { target: { value: '180' } });
    expect(handleChange).toHaveBeenCalledWith(180, 100, 50);
  });

  it('should not call onChange with invalid HSL values (out of range)', () => {
    const handleChange = vi.fn();
    render(<HslInput h={0} s={100} l={50} onChange={handleChange} />);
    const hInput = screen.getByPlaceholderText('H');
    fireEvent.change(hInput, { target: { value: '400' } });
    expect(handleChange).not.toHaveBeenCalled();
    expect(hInput).toHaveStyle('border: 1px solid red');
  });

  it('should update input values when h, s, l props change', () => {
    const handleChange = vi.fn();
    const { rerender } = render(<HslInput h={0} s={100} l={50} onChange={handleChange} />);
    const hInput = screen.getByPlaceholderText('H') as HTMLInputElement;
    const sInput = screen.getByPlaceholderText('S') as HTMLInputElement;
    const lInput = screen.getByPlaceholderText('L') as HTMLInputElement;

    expect(hInput.value).toBe('0');
    expect(sInput.value).toBe('100');
    expect(lInput.value).toBe('50');

    rerender(<HslInput h={120} s={80} l={60} onChange={handleChange} />);

    expect(hInput.value).toBe('120');
    expect(sInput.value).toBe('80');
    expect(lInput.value).toBe('60');
  });
});
