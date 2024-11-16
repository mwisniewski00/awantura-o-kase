import { FormControl, FormLabel, TextField } from '@mui/material';
import React from 'react';
import { FieldsIds, FormInput } from './validation';

interface EmailInputProps {
  error?: string;
}

const FIELD_NAME = FieldsIds[FormInput.EMAIL];

export default function EmailInput({ error }: EmailInputProps) {
  return (
    <FormControl>
      <FormLabel htmlFor={FIELD_NAME}>Email</FormLabel>
      <TextField
        error={Boolean(error)}
        helperText={error}
        id={FIELD_NAME}
        type="email"
        name={FIELD_NAME}
        placeholder="your@email.com"
        autoComplete="email"
        autoFocus
        required
        fullWidth
        variant="outlined"
        color={error ? 'error' : 'primary'}
        sx={{ ariaLabel: 'email' }}
      />
    </FormControl>
  );
}
