import React from 'react';
import { Controller } from 'react-hook-form';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';

const FormAutocomplete = ({
    name,
    control,
    label,
    options,
    required = false,
    loading = false,
    onValueChange,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={required ? { required: `${label} is required` } : {}}
            render={({ field, fieldState }) => (
                <Autocomplete
                    {...field}
                    options={options}
                    getOptionLabel={(option) => option?.label || ''}
                    isOptionEqualToValue={(o, v) => o?.value === v?.value}
                    onChange={(_, val) => {
                        field.onChange(val);
                        onValueChange?.(val);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            fullWidth
                            required={required}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            inputRef={params.InputProps?.ref}
                            slotProps={{
                                htmlInput: params.inputProps,
                                input: {
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {loading && <CircularProgress size={20} />}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                },
                            }}
                        />
                    )}
                />
            )}
        />
    );
};

export default FormAutocomplete;
