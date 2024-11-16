import { useAuth } from '../../providers/AuthProvider';
import { Box } from '@mui/material';
import React from 'react';

export default function UserProfile() {
  const { auth } = useAuth();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        textWrap: 'wrap'
      }}>
      <Box sx={{ width: '400px', overflowWrap: 'break-word' }}>{JSON.stringify(auth)}</Box>
    </Box>
  );
}
