import React, { useState, useRef, lazy, Suspense, useEffect, memo } from 'react';
import { useController } from 'react-hook-form';
import { TextField, Popper, ClickAwayListener, Box } from '@mui/material';
import dayjs from 'dayjs';
import 'react-day-picker/dist/style.css';

const DayPicker = lazy(() =>
    import('react-day-picker').then(mod => ({ default: mod.DayPicker }))
);

function _FormDatePicker({
    name,
    control,
    label,
    required = false,
    minDate = null,
    maxDate = null,
    disablePast = false,
    disableFuture = false,
    validate,
}) {
    const {
        field: { value, onChange, onBlur },
        fieldState: { error },
    } = useController({
        name,
        control,
        defaultValue: null,
        rules: { required: required && 'Required', validate },
    });

    // Compute the “true” formatted value
    const formattedValue = value ? dayjs(value).format('DD/MM/YYYY') : '';

    // Local input state
    const [inputValue, setInputValue] = useState(formattedValue);

    // Keep in sync if value changes externally
    useEffect(() => {
        if (formattedValue !== inputValue) {
            setInputValue(formattedValue);
        }
    }, [formattedValue]);

    // parse+commit
    const parseAndCommit = txt => {
        const d = dayjs(txt, 'DD/MM/YYYY', true);
        if (d.isValid()) {
            onChange(d.toDate());
            // immediately update display to stable DMY
            setInputValue(dayjs(d).format('DD/MM/YYYY'));
        } else {
            onChange(null);
            setInputValue('');
        }
        onBlur();
    };

    const today = dayjs().startOf('day').toDate();

    const effectiveMinDate = disablePast
        ? dayjs(minDate || today).isAfter(today)
            ? dayjs(minDate).toDate()
            : today
        : minDate
            ? dayjs(minDate).toDate()
            : undefined;

    const effectiveMaxDate = disableFuture
        ? dayjs(maxDate || today).isBefore(today)
            ? dayjs(maxDate).toDate()
            : today
        : maxDate
            ? dayjs(maxDate).toDate()
            : undefined;

    const disabledMatchers = [];

    if (disablePast) disabledMatchers.push({ before: effectiveMinDate });

    if (disableFuture) disabledMatchers.push({ after: effectiveMaxDate });

    // Popper state
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    useEffect(() => { import('react-day-picker'); }, []);

    return (
        <>
            <TextField
                inputRef={anchorRef}
                label={label}
                placeholder="DD/MM/YYYY"
                value={inputValue}
                onClick={() => {
                    // reset display to the true formatted value
                    setInputValue(formattedValue);
                    setOpen(true);
                }}
                onChange={e => {
                    const txt = e.target.value;
                    if (/^\d{0,2}(\/\d{0,2}(\/\d{0,4})?)?$/.test(txt)) {
                        setInputValue(txt);
                    }
                }}
                onBlur={() => {
                    // only re-format when popper is closed *and* text differs
                    if (!open && inputValue !== formattedValue) {
                        parseAndCommit(inputValue);
                    }
                }}
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
            />

            <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start" style={{ zIndex: 1300 }}>
                <ClickAwayListener onClickAway={() => {
                    // only parse if the user actually changed the text
                    if (inputValue !== formattedValue) {
                        parseAndCommit(inputValue);
                    }
                    setOpen(false);
                }}
                >
                    <Box sx={{ bgcolor: 'background.paper', boxShadow: 1, borderRadius: 1, p: 1 }}>
                        <Suspense fallback={<div>Loading…</div>}>
                            <DayPicker
                                mode="single"
                                selected={value instanceof Date ? value : undefined}
                                onSelect={date => {
                                    const fmt = dayjs(date).format('DD/MM/YYYY');
                                    setInputValue(fmt);
                                    onChange(date);
                                    onBlur();
                                    setOpen(false);
                                }}
                                disabled={disabledMatchers}
                                hidden={{ before: effectiveMinDate, after: effectiveMaxDate }}
                                captionLayout="dropdown"
                            />
                        </Suspense>
                    </Box>
                </ClickAwayListener>
            </Popper>
        </>
    );
}

export default memo(_FormDatePicker);













