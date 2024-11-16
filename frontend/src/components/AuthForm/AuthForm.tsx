import React, { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppLogoLarge from '../../images/AppLogoLarge';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px'
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px'
  })
}));

const SignInContainer = styled(Box)(() => ({
  marginTop: '50px'
}));

const LogoContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center'
}));

interface AuthFormProps {
  actionLabel: string;
  onSubmit: (formData: FormData) => void;
}

export default function AuthForm({
  actionLabel,
  children,
  onSubmit
}: PropsWithChildren<AuthFormProps>) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit(data);
  };

  return (
    <SignInContainer>
      <Card variant="outlined">
        <LogoContainer>
          <AppLogoLarge />
        </LogoContainer>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
          {actionLabel}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2
          }}>
          {children}
        </Box>
      </Card>
    </SignInContainer>
  );
}
