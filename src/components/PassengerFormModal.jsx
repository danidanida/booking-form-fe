// PassengerFormModal.jsx
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { isValidThaiPhone, isValidEmail } from '../utils/validations';
import FormDatePicker from './FormDatePicker';


export default function PassengerFormModal({ index, onClose, update }) {
    const {
        control,
        trigger,
        getValues,
        formState: { errors },
    } = useFormContext();

    const field = (name) => `passengers.${index}.${name}`;

    const handleSave = async () => {
        // only trigger passenger fields
        const valid = await trigger([
            field('fullName'),
            field('phone'),
            field('email'),
            field('birthDate'),
            field('passport'),
            field('passportExpiry'),
        ]);

        if (!valid) {
            console.log('passenger validation errors:', errors);
            return;
        }

        // grab just this passenger’s data
        const passengerData = getValues(`passengers.${index}`);
        update(index, passengerData);
        onClose();
    };

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="sm"
            keepMounted
            slotProps={{
                transition: {
                    mountOnEnter: false,
                    unmountOnExit: false,
                },
            }}>
            <DialogTitle>Edit Passenger {index + 1}</DialogTitle>
            <DialogContent>
                <Controller
                    name={field('fullName')}
                    control={control}
                    defaultValue=""
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
                    name={field('phone')}
                    control={control}
                    defaultValue=""
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
                    name={field('email')}
                    control={control}
                    defaultValue=""
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
                    name={field('birthDate')}
                    control={control}
                    defaultValue={null}
                    label="Birthdate"
                    required
                    maxDate={dayjs()}
                    validate={(val) =>
                        val && dayjs(val).isBefore(dayjs()) ? true : 'Must be in the past'
                    }
                />

                <Controller
                    name={field('passport')}
                    control={control}
                    defaultValue=""
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
                    name={field('passportExpiry')}
                    control={control}
                    defaultValue={null}
                    label="Passport Expiry"
                    required
                    minDate={dayjs().add(1, 'day')}
                    validate={(val) =>
                        val && dayjs(val).isAfter(dayjs()) ? true : 'Must be in the future'
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}





