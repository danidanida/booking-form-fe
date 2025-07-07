import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import {
    Box,
    Stack,
    IconButton,
    TextField,
    Button,
    useTheme,
    useMediaQuery,
    CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FormAutocomplete from './FormAutocomplete';
import { stations } from '../data/stations';
import { getToStations } from '../services/stationService';

export default React.memo(function PassengerControls({
    count,
    onAdd,
    onRemove,
    control,
    isSubmitting,
    onSubmit
}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { watch, setValue } = useFormContext();

    const departureStation = watch('departureStation');
    const [toOptions, setToOptions] = useState([]);
    const [loadingTo, setLoadingTo] = useState(false);

    useEffect(() => {
        if (!departureStation) {
            setToOptions([]);
            return;
        }
        setLoadingTo(true);
        getToStations(departureStation)
            .then((opts) => setToOptions(opts))
            .finally(() => setLoadingTo(false));
    }, [departureStation]);

    const [rawCount, setRawCount] = useState(String(count));
    useEffect(() => {
        setRawCount(String(count));
    }, [count]);

    const handleRawChange = (e) => {
        const value = e.target.value;
        setRawCount(value);
        const parsed = Math.max(0, Math.min(100, Number(value) || 0));
        if (parsed > count) {
            for (let i = 0; i < parsed - count; i++) onAdd();
        } else if (parsed < count) {
            for (let i = 0; i < count - parsed; i++) onRemove(count - 1 - i);
        }
    };

    return (
        <Box mb={4}>
            <Stack
                component="fieldset"
                direction={isMobile ? 'column' : 'row'}
                spacing={2}
                alignItems={isMobile ? 'stretch' : 'flex-start'}
                justifyContent="space-between"
                sx={{
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    boxShadow: 1,
                    p: 2,
                }}
            >
                <Box flex={1}>
                    <FormAutocomplete
                        name="departureStation"
                        control={control}
                        label="Departure"
                        options={stations}
                        required
                        onValueChange={() => setValue('arrivalStation', null)}
                    />
                </Box>

                <Box flex={1}>
                    <FormAutocomplete
                        name="arrivalStation"
                        control={control}
                        label="Arrival"
                        options={toOptions}
                        required
                        loading={loadingTo}
                    />
                </Box>

                <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                            onClick={() => onRemove(count - 1)}
                            disabled={count <= 0 || isSubmitting}
                            aria-label="decrement passenger"
                        >
                            <RemoveIcon />
                        </IconButton>

                        <TextField
                            type="number"
                            label="Passengers"
                            value={rawCount}
                            onChange={handleRawChange}
                            slotProps={{
                                input: {
                                    inputProps: {
                                        min: 0,
                                        max: 100,
                                        style: { textAlign: 'center' },
                                    },
                                },
                            }}
                            sx={{ width: 120 }}
                            disabled={isSubmitting}
                        />

                        <IconButton
                            onClick={onAdd}
                            disabled={count >= 100 || isSubmitting}
                            aria-label="increment passenger"
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Box flex={isMobile ? 'unset' : 0.5} mt={isMobile ? 2 : 0}>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth={isMobile}
                        disabled={isSubmitting}
                        onClick={onSubmit}
                        aria-label="submit booking"
                        sx={{
                            backgroundColor: '#2563eb',
                            fontWeight: 600,
                            py: 1.2,
                            px: 3,
                            borderRadius: 2,
                            '&:hover': { backgroundColor: '#1e40af' },
                            marginTop:'5px'
                        }}
                    >
                        {isSubmitting ? (
                            <CircularProgress size={24} />
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
});







