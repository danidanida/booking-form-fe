import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { isValidThaiPhone, isValidEmail } from '../utils/validations';
import FormDatePicker from './FormDatePicker';

export default function PassengerFormModal({
  index,
  onClose,
  update,
  passenger,
}) {
  // LOCAL form instance, seeded with the passed-in passenger
  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: passenger,
    mode: 'onBlur',
  });

  // When the user clicks "Save", validate & then push back up
  const onSave = async (data) => {
    // trigger all fields in this form
    const valid = await trigger();
    if (!valid) return;
    update(index, data);
    onClose();
  };

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      keepMounted
      slotProps={{
        transition: { mountOnEnter: false, unmountOnExit: false },
      }}
    >
      <DialogTitle>Edit Passenger {index + 1}</DialogTitle>
      <DialogContent>
        <Controller
          name="fullName"
          control={control}
          rules={{
            required: 'Full Name is required',
            minLength: { value: 3, message: 'Min 3 characters' },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Full Name"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'Phone is required',
            validate: isValidThaiPhone,
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Phone (+66XXXXXXXXX)"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            validate: isValidEmail,
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Email"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <FormDatePicker
          name="birthDate"
          control={control}
          label="Birthdate"
          required
          maxDate={dayjs().toDate()}
          validate={(val) =>
            val && dayjs(val).isBefore(dayjs())
              ? true
              : 'Must be in the past'
          }
        />

        <Controller
          name="passport"
          control={control}
          rules={{ required: 'Passport is required' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Passport Number"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <FormDatePicker
          name="passportExpiry"
          control={control}
          label="Passport Expiry"
          required
          minDate={dayjs().add(1, 'day').toDate()}
          validate={(val) =>
            val && dayjs(val).isAfter(dayjs())
              ? true
              : 'Must be in the future'
          }
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSave)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}






