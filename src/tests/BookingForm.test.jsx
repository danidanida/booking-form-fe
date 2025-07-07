/* global describe, it, expect */
import React from 'react';
import { render, screen } from '@testing-library/react';
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
}); 