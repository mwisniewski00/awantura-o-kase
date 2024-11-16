import React, { useCallback, useState } from 'react';
import AuthForm from './AuthForm';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link, Typography } from '@mui/material';
import { FormInput, validateCreateAccountFormData } from './validation';
import { useFormValidation } from './useFormValidation';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import UsernameInput from './UsernameInput';
import { createAccount } from '../../services/auth-api';
import { getErrorMessage } from '../../services/utils';
import { useErrorNotification } from '../../hooks/useErrorNotification';
import { useSuccessNotification } from '../../hooks/useSuccessNotification';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../Navigation/constants';

const ACTION_LABEL = 'Create account';
const FIELDS = [FormInput.EMAIL, FormInput.USERNAME, FormInput.PASSWORD];

export function SignUpForm() {
  const { errors, validate } = useFormValidation(FIELDS);
  const [isLoading, setIsLoading] = useState(false);
  const notifyError = useErrorNotification();
  const notifySuccess = useSuccessNotification();
  const navigate = useNavigate();

  const createUserAccount = useCallback(
    (formData: FormData) => {
      void (async () => {
        try {
          setIsLoading(true);
          const createUserRequest = validateCreateAccountFormData(formData);
          await createAccount(createUserRequest);
          notifySuccess('Account created. You can login now.');
          navigate(ROUTES.SIGN_IN);
        } catch (error) {
          notifyError(`Failed to create account: ${getErrorMessage(error)}`);
        } finally {
          setIsLoading(false);
        }
      })();
    },
    [navigate, notifyError, notifySuccess]
  );

  const onSubmit = (data: FormData) => {
    const hasErrors = Object.keys(errors).length;
    console.log('has errors', hasErrors);
    if (hasErrors) return;
    createUserAccount(data);
  };

  return (
    <AuthForm actionLabel={ACTION_LABEL} onSubmit={onSubmit}>
      <EmailInput error={errors[FormInput.EMAIL]} />
      <UsernameInput error={errors[FormInput.USERNAME]} />
      <PasswordInput error={errors[FormInput.PASSWORD]} />
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        onClick={validate}
        loading={isLoading}>
        {ACTION_LABEL}
      </LoadingButton>
      <Typography sx={{ textAlign: 'center' }}>
        Already have an account?{' '}
        <span>
          <Link href="/sign-in" variant="body2" sx={{ alignSelf: 'center' }}>
            Login
          </Link>
        </span>
      </Typography>
    </AuthForm>
  );
}
