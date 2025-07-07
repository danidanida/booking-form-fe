/* global describe, it, expect */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import PassengerControls from '../components/PassengerControls';

// Wrapper component to provide form context
const TestWrapper = ({ children }) => {
  const methods = useForm({
    defaultValues: {
      passengerCount: 1
    }
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('PassengerControls', () => {
  it('renders without crashing', () => {
    render(
      <TestWrapper>
        <PassengerControls />
      </TestWrapper>
    );
    
    // Check that the main elements are present
    expect(screen.getByLabelText('Passengers')).toBeInTheDocument();
    expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
    expect(screen.getByTestId('RemoveIcon')).toBeInTheDocument();
  });
}); 