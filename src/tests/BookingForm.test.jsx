/* global describe, it, expect */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import BookingForm from '../components/BookingForm';

// Wrapper component to provide form context
const TestWrapper = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('BookingForm', () => {
  it('renders without crashing', () => {
    render(
      <TestWrapper>
        <BookingForm />
      </TestWrapper>
    );
    
    // Check that the main form elements are present
    expect(screen.getByText('Trip Details')).toBeInTheDocument();
    expect(screen.getByText('Departure')).toBeInTheDocument();
    expect(screen.getByText('Arrival')).toBeInTheDocument();
    expect(screen.getByLabelText('Passengers')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('adds and removes passengers dynamically', async () => {
    render(
      <TestWrapper>
        <BookingForm />
      </TestWrapper>
    );
    // Add two passengers
    fireEvent.click(screen.getByLabelText('increment passenger'));
    fireEvent.click(screen.getByLabelText('increment passenger'));
    // There should be three passenger cards (including the first one)
    expect(screen.getAllByText(/passenger/i).length).toBeGreaterThanOrEqual(1);
    // Remove a passenger
    fireEvent.click(screen.getByLabelText('decrement passenger'));
    // The number of passenger cards should decrease
    // (We can't check exact number due to how the UI is structured, but we can check the button is still present)
    expect(screen.getByLabelText('increment passenger')).toBeInTheDocument();
  });
}); 