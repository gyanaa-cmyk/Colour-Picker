import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from './Input';

describe('Input', () => {
  it('should render with a value and placeholder', () => {
    const handleChange = vi.fn();
    render(
      <Input
        value="test value"
        onChange={handleChange}
        placeholder="test placeholder"
      />
    );
    const inputElement = screen.getByPlaceholderText('test placeholder') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe('test value');
  });

  it('should call onChange when value changes', () => {
    const handleChange = vi.fn();
    render(
      <Input
        value=""
        onChange={handleChange}
        placeholder="test placeholder"
      />
    );
    const inputElement = screen.getByPlaceholderText('test placeholder');
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should apply error styling when hasError is true', () => {
    const handleChange = vi.fn();
    render(
      <Input
        value=""
        onChange={handleChange}
        placeholder="test placeholder"
        hasError={true}
      />
    );
    const inputElement = screen.getByPlaceholderText('test placeholder');
    expect(inputElement).toHaveStyle('border: 1px solid red');
  });
});
