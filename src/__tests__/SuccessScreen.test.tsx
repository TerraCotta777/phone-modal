import { render, screen, fireEvent } from '@testing-library/react';
import { SuccessScreen } from '../components/SuccessScreen';

describe('SuccessScreen', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders success message with phone number', () => {
    render(<SuccessScreen phone="1234567890" onClose={mockOnClose} />);
    
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Your phone number has been saved:')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<SuccessScreen phone="1234567890" onClose={mockOnClose} />);
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
}); 