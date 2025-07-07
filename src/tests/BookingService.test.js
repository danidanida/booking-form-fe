/* global describe, it, expect */
import { submitBookingForm } from '../services/bookingService';

describe('submitBookingForm', () => {
  it('resolves with success when passengers are present', async () => {
    const formData = { passengers: [{ fullName: 'Test' }] };
    await expect(submitBookingForm(formData)).resolves.toMatchObject({
      status: 200,
      data: { id: expect.any(Number) },
    });
  });

  it('rejects with error when no passengers are present', async () => {
    const formData = { passengers: [] };
    await expect(submitBookingForm(formData)).rejects.toMatchObject({
      status: 400,
      data: { message: 'No passengers provided' },
    });
  });
}); 