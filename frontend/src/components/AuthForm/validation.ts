import { CreateAccountRequest, LogInRequest } from '../../services/auth-api';

export enum FormInput {
  EMAIL = 'EMAIL',
  USERNAME = 'USERNAME',
  PASSWORD = 'PASSWORD'
}

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export type Errors = {
  [key in FormInput]?: string;
};

export type FieldValidators = Record<FormInput, (input: HTMLInputElement) => ValidationResult>;

export const isEmailValid = (emailInput: HTMLInputElement) => {
  const isValid = Boolean(emailInput.value) && /\S+@\S+\.\S+/.test(emailInput.value);
  const errorMessage = isValid ? undefined : 'Please enter a valid email address.';
  return {
    isValid,
    errorMessage
  };
};

export const isPasswordValid = (passwordInput: HTMLInputElement) => {
  const isValid = Boolean(passwordInput.value) && passwordInput.value.length >= 6;
  const errorMessage = isValid ? undefined : 'Password must be at least 6 characters long.';
  return {
    isValid,
    errorMessage
  };
};

export const isUserNameValid = (usernameInput: HTMLInputElement) => {
  const isValid = Boolean(usernameInput.value) && usernameInput.value.length >= 3;
  const errorMessage = isValid ? undefined : 'Username must be at least 3 characters long.';
  return {
    isValid,
    errorMessage
  };
};

export const FieldsValidators: FieldValidators = {
  [FormInput.EMAIL]: isEmailValid,
  [FormInput.PASSWORD]: isPasswordValid,
  [FormInput.USERNAME]: isUserNameValid
};

export const FieldsIds: Record<FormInput, string> = {
  [FormInput.EMAIL]: 'email',
  [FormInput.USERNAME]: 'userName',
  [FormInput.PASSWORD]: 'password'
};

const getFormDataObject = (formData: FormData) =>
  [...formData.entries()].reduce<Record<string, string>>((entriesObject, [key, value]) => {
    entriesObject[key] = String(value);
    return entriesObject;
  }, {});

export const validateCreateAccountFormData = (formData: FormData): CreateAccountRequest => {
  const formDataObject = getFormDataObject(formData);
  if (
    FieldsIds[FormInput.EMAIL] in formDataObject &&
    FieldsIds[FormInput.USERNAME] in formDataObject &&
    FieldsIds[FormInput.PASSWORD] in formDataObject
  ) {
    const { email, userName, password } = formDataObject;
    return { email, userName, password };
  }

  throw new Error('Form data is missing required fields');
};

export const validateLoginFormData = (formData: FormData): LogInRequest => {
  const formDataObject = getFormDataObject(formData);
  if (
    FieldsIds[FormInput.EMAIL] in formDataObject &&
    FieldsIds[FormInput.PASSWORD] in formDataObject
  ) {
    const { email, password } = formDataObject;
    return { email, password };
  }

  throw new Error('Form data is missing required fields');
};
