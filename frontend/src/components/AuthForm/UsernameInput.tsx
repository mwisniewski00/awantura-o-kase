import { FormControl, Box, FormLabel, TextField } from '@mui/material';
import React from 'react';
import { FieldsIds, FormInput } from './validation';

interface UsernameInput {
  error?: string;
}

const FIELD_NAME = FieldsIds[FormInput.USERNAME];

export default function UsernameInput({ error }: UsernameInput) {
  return (
    <FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormLabel htmlFor={FIELD_NAME}>Username</FormLabel>
      </Box>
      <TextField
        error={Boolean(error)}
        helperText={error}
        name={FIELD_NAME}
        placeholder="Username..."
        type="text"
        id={FIELD_NAME}
        autoComplete="username"
        autoFocus
        required
        fullWidth
        variant="outlined"
        color={error ? 'error' : 'primary'}
      />
    </FormControl>
  );
}
