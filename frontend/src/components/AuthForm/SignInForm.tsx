import React, { useCallback, useState } from 'react';
import AuthForm from './AuthForm';
import { Link, Typography } from '@mui/material';
import { useFormValidation } from './useFormValidation';
import { FormInput, validateLoginFormData } from './validation';
import LoadingButton from '@mui/lab/LoadingButton';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import { logIn } from '../../services/auth-api';
import { useAuth } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useErrorNotification } from '../../hooks/useErrorNotification';
import { getErrorMessage } from '../../services/utils';

const ACTION_LABEL = 'Login';
const FIELDS = [FormInput.EMAIL, FormInput.PASSWORD];

export function SignInForm() {
  const { errors, validate } = useFormValidation(FIELDS);
  const notifyError = useErrorNotification();
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const login = useCallback(
    (formData: FormData) => {
      if (Object.keys(errors).length) return;
      void (async () => {
        try {
          setIsLoading(true);
          const loginRequest = validateLoginFormData(formData);
          const { data } = await logIn(loginRequest);
          const { jwtToken, userName, email } = data;
          setAuth({ token: jwtToken, username: userName, email });
          navigate('/');
        } catch (error) {
          notifyError(`Failed to login: ${getErrorMessage(error)}`);
        } finally {
          setIsLoading(false);
        }
      })();
    },
    [errors, navigate, notifyError, setAuth]
  );

  return (
    <AuthForm actionLabel={ACTION_LABEL} onSubmit={login}>
      <EmailInput error={errors[FormInput.EMAIL]} />
      <PasswordInput error={errors[FormInput.PASSWORD]} />
      <LoadingButton
        type="submit"
        variant="contained"
        fullWidth
        onClick={validate}
        loading={isLoading}>
        {ACTION_LABEL}
      </LoadingButton>
      <Typography sx={{ textAlign: 'center' }}>
        Don&apos;t have an account?{' '}
        <span>
          <Link href="/sign-up" variant="body2" sx={{ alignSelf: 'center' }}>
            Create account
          </Link>
        </span>
      </Typography>
    </AuthForm>
  );
}
