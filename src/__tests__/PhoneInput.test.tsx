import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhoneInput } from '../components/PhoneInput';

describe('PhoneInput', () => {
  const mockOnSave = jest.fn();

  beforeEach(() => {
    localStorage.clear();
    mockOnSave.mockClear();
  });

  it('renders phone input form', () => {
    render(<PhoneInput onSave={mockOnSave} />);
    
    expect(screen.getByPlaceholderText('Enter phone number')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('loads saved phone number from localStorage', () => {
    localStorage.setItem('userPhone', '1234567890');
    render(<PhoneInput onSave={mockOnSave} />);
    
    expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
  });

  it('validates and saves valid phone number', async () => {
    render(<PhoneInput onSave={mockOnSave} />);
    
    const input = screen.getByPlaceholderText('Enter phone number');
    await userEvent.type(input, '1234567890');
    
    const submitButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(submitButton);

    expect(mockOnSave).toHaveBeenCalledWith('1234567890');
    expect(screen.queryByText(/please enter a valid phone number/i)).not.toBeInTheDocument();
  });

  it('shows error for invalid phone number', async () => {
    render(<PhoneInput onSave={mockOnSave} />);
    
    const input = screen.getByPlaceholderText('Enter phone number');
    await userEvent.type(input, '123');
    
    const submitButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(submitButton);

    expect(mockOnSave).not.toHaveBeenCalled();
    expect(screen.getByText(/please enter a valid phone number/i)).toBeInTheDocument();
  });

  it('accepts phone number with non-digit characters', async () => {
    render(<PhoneInput onSave={mockOnSave} />);
    
    const input = screen.getByPlaceholderText('Enter phone number');
    await userEvent.type(input, '(123) 456-7890');
    
    const submitButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(submitButton);

    expect(mockOnSave).toHaveBeenCalledWith('1234567890');
  });
}); 