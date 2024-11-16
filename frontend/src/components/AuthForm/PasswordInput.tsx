import { FormControl, Box, FormLabel, TextField } from '@mui/material';
import React from 'react';
import { FieldsIds, FormInput } from './validation';

interface PasswordInput {
  error?: string;
  isNew?: boolean;
}

const FIELD_NAME = FieldsIds[FormInput.PASSWORD];

export default function PasswordInput({ error, isNew }: PasswordInput) {
  return (
    <FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormLabel htmlFor={FIELD_NAME}>Password</FormLabel>
      </Box>
      <TextField
        error={Boolean(error)}
        helperText={error}
        name={FIELD_NAME}
        placeholder="••••••"
        type="password"
        id={FIELD_NAME}
        autoComplete={isNew ? 'new-password' : 'current-password'}
        autoFocus
        required
        fullWidth
        variant="outlined"
        color={error ? 'error' : 'primary'}
      />
    </FormControl>
  );
}
