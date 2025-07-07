import React, {
    Suspense,
    lazy,
    useState,
    useCallback,
    useMemo,
    startTransition,
    useEffect,
} from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { Box, Typography, Alert } from '@mui/material';
import PassengerControls from './PassengerControls';
import PassengerList from './PassengerList';
import { submitBookingForm } from '../services/bookingService';
import SubmissionSuccess from './SubmissionSuccess';
import { DEFAULT_PASSENGER } from '../data/defaultPassenger';

const LazyModal = lazy(() => import('./PassengerFormModal'));

export default function BookingForm() {
    const [submitError, setSubmitError] = useState('');
    const [activeIndex, _setActiveIndex] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [bookingId, setBookingId] = useState(null);

    const methods = useForm({
        defaultValues: {
            departureStation: '',
            arrivalStation: '',
            passengers: [],
        },
    });
    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = methods;

    const { fields, append, remove, update: rawUpdate } = useFieldArray({
        control,
        name: 'passengers',
    });

    const count = fields.length;

    const setActiveIndex = useCallback((i) => {
        startTransition(() => _setActiveIndex(i));
    }, []);

    const handleAdd = useCallback(() => {
        append(DEFAULT_PASSENGER());
        setSubmitError(prev =>
            prev === 'No passengers provided' ? '' : prev
        );
    }, [append, setSubmitError]);

    const handleRemove = useCallback((i) => remove(i), [remove]);

    const handleUpdate = (i, data) => {
        rawUpdate(i, data);
        setSubmitError('');
    };

    const list = useMemo(
        () => (
            <PassengerList
                fields={fields}
                activeIndex={activeIndex}
                setActive={setActiveIndex}
                remove={handleRemove}
            />
        ),
        [fields, activeIndex, handleRemove, setActiveIndex]
    );

    // pre-fetch modal chunk
    useEffect(() => {
        import('./PassengerFormModal');
    }, []);

    const onSubmit = async (data) => {

        if (!data.departureStation || !data.arrivalStation) {
            setSubmitError('Please select both Departure and Arrival stations.');
            return;
        }
        if (data.passengers.length === 0) {
            setSubmitError('No passengers provided');
            return;
        }

        const invalidIndex = data.passengers.findIndex(
            ({ fullName, phone, email, birthDate, passport, passportExpiry }) =>
                !fullName ||
                !phone ||
                !email ||
                !birthDate ||
                !passport ||
                !passportExpiry
        );

        if (invalidIndex !== -1) {
            setSubmitError(
                `Please complete passengers' details before submitting.`
            );
            return;
        }

        setSubmitError('');
        try {
            const result = await submitBookingForm(data);
            // In real life to process api response, status etc. 
            setBookingId(result?.data?.id)
            setIsSuccess(true);
        } catch (err) {
            setSubmitError(err.message || 'Submission failed—try again.');
        }
    };

    const handleReset = () => {
        reset(
            {
                departureStation: '',
                arrivalStation: '',
                passengers: [],
            },
            { keepDefaultValues: true }
        );
        setSubmitError('');
        setIsSuccess(false);
        setBookingId(null);
    };

    if (isSuccess) {
        return <SubmissionSuccess bookingId={bookingId} onReset={handleReset} />;
    }

    return (
        <FormProvider {...methods}>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ width: '100%', maxWidth: 900, mx: 'auto' }}
            >
                <Typography variant="h5" gutterBottom mb={2}>
                    Trip Details
                </Typography>
                <Box mb={2}>
                    <PassengerControls
                        count={count}
                        onAdd={handleAdd}
                        onRemove={handleRemove}
                        control={control}
                        isSubmitting={isSubmitting}
                        onSubmit={handleSubmit(onSubmit)}
                    />
                    {submitError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {submitError}
                        </Alert>
                    )}
                    {list}
                    {activeIndex !== null && (
                        <Suspense fallback={null}>
                            <LazyModal
                                index={activeIndex}
                                onClose={() => setActiveIndex(null)}
                                update={handleUpdate}
                                passenger={fields[activeIndex]}
                            />
                        </Suspense>
                    )}
                </Box>
            </Box>
        </FormProvider>
    );
}








