import React from 'react';
import { createRoot } from 'react-dom/client';
import { setPhone } from '../index';

// Mock React's createElement
jest.mock('react', () => ({
  createElement: jest.fn((type, props) => ({ type, props })),
}));

// Mock PhoneModal component
jest.mock('../components/PhoneModal', () => ({
  PhoneModal: 'PhoneModal',
}));

// Mock createRoot
jest.mock('react-dom/client', () => {
  let onCloseCallback: (() => void) | null = null;
  
  const mockRender = jest.fn((element) => {
    if (element?.props?.onClose) {
      onCloseCallback = element.props.onClose;
    }
  });

  const mockUnmount = jest.fn(() => {
    onCloseCallback = null;
  });

  const mockCreateRoot = jest.fn(() => ({
    render: mockRender,
    unmount: mockUnmount,
  }));

  return {
    createRoot: mockCreateRoot,
    __mockRender: mockRender,
    __mockUnmount: mockUnmount,
    __mockCreateRoot: mockCreateRoot,
    __triggerClose: () => onCloseCallback?.(),
  };
});

describe('setPhone', () => {
  let mockRender: jest.Mock;
  let mockUnmount: jest.Mock;
  let mockCreateRoot: jest.Mock;
  let triggerClose: () => void;

  beforeEach(() => {
    // Get mock functions
    const reactDomClient = require('react-dom/client');
    mockRender = reactDomClient.__mockRender;
    mockUnmount = reactDomClient.__mockUnmount;
    mockCreateRoot = reactDomClient.__mockCreateRoot;
    triggerClose = reactDomClient.__triggerClose;

    // Clear all mocks
    jest.clearAllMocks();
    
    // Clear localStorage and document body
    localStorage.clear();
    document.body.innerHTML = '';
  });

  it('creates container element if it does not exist', () => {
    setPhone();
    expect(document.getElementById('phone-modal-container')).toBeTruthy();
  });

  it('reuses existing container if it already exists', () => {
    // Create container first
    const container = document.createElement('div');
    container.id = 'phone-modal-container';
    document.body.appendChild(container);

    // Call setPhone
    setPhone();

    // Verify no new container was created
    expect(document.querySelectorAll('#phone-modal-container')).toHaveLength(1);
  });

  it('returns saved phone number when modal is closed', async () => {
    localStorage.setItem('userPhone', '1234567890');
    const promise = setPhone();
    triggerClose();
    const result = await promise;
    expect(result).toBe('1234567890');
    expect(mockUnmount).toHaveBeenCalled();
  });

  it('returns empty string when no phone number is saved', async () => {
    const promise = setPhone();
    triggerClose();
    const result = await promise;
    expect(result).toBe('');
    expect(mockUnmount).toHaveBeenCalled();
  });

  it('reuses existing promise if setPhone is called multiple times', async () => {
    const promise1 = setPhone();
    const promise2 = setPhone();

    expect(mockCreateRoot).toHaveBeenCalledTimes(1);
    
    triggerClose();
    const [result1, result2] = await Promise.all([promise1, promise2]);
    expect(result1).toBe(result2);
    expect(mockUnmount).toHaveBeenCalledTimes(1);
  });

  it('creates new promise after previous one is resolved', async () => {
    // First call
    const promise1 = setPhone();
    triggerClose();
    await promise1;
    expect(mockCreateRoot).toHaveBeenCalledTimes(1);
    expect(mockUnmount).toHaveBeenCalledTimes(1);

    // Reset mocks
    jest.clearAllMocks();

    // Second call
    const promise2 = setPhone();
    triggerClose();
    await promise2;
    expect(mockCreateRoot).toHaveBeenCalledTimes(1);
    expect(mockUnmount).toHaveBeenCalledTimes(1);
  });

  it('properly cleans up after modal is closed', async () => {
    const promise = setPhone();
    triggerClose();
    await promise;
    
    // Verify cleanup
    expect(mockUnmount).toHaveBeenCalled();
    expect(document.getElementById('phone-modal-container')).toBeTruthy();
  });

  it('renders PhoneModal with correct props', () => {
    setPhone();
    
    // Verify React.createElement was called with correct arguments
    expect(React.createElement).toHaveBeenCalledWith(
      'PhoneModal',
      expect.objectContaining({
        onClose: expect.any(Function)
      })
    );
  });
}); 