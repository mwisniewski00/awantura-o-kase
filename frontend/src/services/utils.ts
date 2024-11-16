import { AxiosError } from 'axios';

function isAxiosError(error: unknown): error is AxiosError {
  return (
    typeof error === 'object' && error !== null && 'name' in error && error?.name === 'AxiosError'
  );
}

type ArrayApiError = Array<{
  code: string;
  description: string;
}>;

function isArrayApiError(error: unknown): error is ArrayApiError {
  return (
    Array.isArray(error) &&
    error.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'code' in item &&
        typeof item.code === 'string' &&
        'description' in item &&
        typeof item.description === 'string'
    )
  );
}

function getAxiosErrorMessage(error: AxiosError) {
  const errorData = error.response?.data;
  if (isArrayApiError(errorData)) {
    return errorData.map((e) => e.description).join(', ');
  }
  return errorData;
}

export function getErrorMessage(error: unknown) {
  if (isAxiosError(error)) {
    return getAxiosErrorMessage(error);
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unexpected error';
}
