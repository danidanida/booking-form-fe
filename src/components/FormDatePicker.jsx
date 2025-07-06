// src/components/FormDatePicker.jsx

import React, {
  useState,
  useRef,
  lazy,
  Suspense,
  useEffect,
  memo,
} from 'react';
import { useController } from 'react-hook-form';
import { TextField, Popper, ClickAwayListener, Box } from '@mui/material';
import dayjs from 'dayjs';
import 'react-day-picker/dist/style.css';

// Lazy‐load the calendar
const DayPicker = lazy(() =>
  import('react-day-picker').then((mod) => ({ default: mod.DayPicker }))
);

function _FormDatePicker({
  name,
  control,
  label,
  required = false,
  minDate = null,
  maxDate = null,
  validate,
}) {
  // subscribe this component only to its own field
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: null,
    rules: {
      required: required && 'Required',
      validate,
    },
  });

  // Local input state
  const [inputValue, setInputValue] = useState(
    value ? dayjs(value).format('DD/MM/YYYY') : ''
  );

  // Sync if external value changes (e.g. form reset)
  useEffect(() => {
    setInputValue(value ? dayjs(value).format('DD/MM/YYYY') : '');
  }, [value]);

  // Popper open state
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  // Pre‐fetch the calendar code
  useEffect(() => {
    import('react-day-picker');
  }, []);

  // Helpers
  const parseAndCommit = (txt) => {
    const parsed = dayjs(txt, 'DD/MM/YYYY', true);
    if (parsed.isValid()) {
      onChange(parsed.toDate());
    } else {
      onChange(null);
    }
    onBlur();
  };

  return (
    <>
      <TextField
        inputRef={anchorRef}
        label={label}
        placeholder="DD/MM/YYYY"
        value={inputValue}
        onClick={() => setOpen(true)}
        onChange={(e) => {
          const txt = e.target.value;
          // Only allow digits & slashes as user types
          if (/^\d{0,2}(\/\d{0,2}(\/\d{0,4})?)?$/.test(txt)) {
            setInputValue(txt);
          }
        }}
        onBlur={() => {
          // commit on blur
          parseAndCommit(inputValue);
        }}
        fullWidth
        margin="normal"
        error={!!error}
        helperText={error?.message}
      />

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        style={{ zIndex: 1300 }}
      >
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Box sx={{ bgcolor: 'background.paper', boxShadow: 1, borderRadius: 1, p: 1 }}>
            <Suspense fallback={<div>Loading…</div>}>
              <DayPicker
                mode="single"
                selected={
                  value instanceof Date
                    ? value
                    : dayjs(value, 'DD/MM/YYYY', true).isValid()
                    ? dayjs(value, 'DD/MM/YYYY', true).toDate()
                    : undefined
                }
                onSelect={(date) => {
                  // update both local and form on select
                  const formatted = dayjs(date).format('DD/MM/YYYY');
                  setInputValue(formatted);
                  onChange(date);
                  onBlur();
                  setOpen(false);
                }}
                fromDate={minDate ? dayjs(minDate).toDate() : undefined}
                toDate={maxDate ? dayjs(maxDate).toDate() : undefined}
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










