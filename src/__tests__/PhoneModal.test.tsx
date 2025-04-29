import { render, screen, fireEvent } from '@testing-library/react';
import { PhoneModal } from '../components/PhoneModal';

describe('PhoneModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    localStorage.clear();
    mockOnClose.mockClear();
  });

  it('renders phone input when no phone is saved', () => {
    render(<PhoneModal onClose={mockOnClose} />);
    
    expect(screen.getByPlaceholderText('Enter phone number')).toBeInTheDocument();
  });

  it('renders success screen when phone is saved in localStorage', () => {
    localStorage.setItem('userPhone', '1234567890');
    render(<PhoneModal onClose={mockOnClose} />);
    
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    localStorage.setItem('userPhone', '1234567890');
    render(<PhoneModal onClose={mockOnClose} />);
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('creates modal root element if it does not exist', () => {
    document.body.innerHTML = '';
    render(<PhoneModal onClose={mockOnClose} />);
    
    expect(document.getElementById('phone-modal-root')).toBeInTheDocument();
  });
}); 