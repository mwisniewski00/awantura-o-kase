import { AxiosError } from 'axios';
import { PLAYER_COLOR } from '../types/game';

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

export function indexToLetter(index: number): string {
  if (index < 0) {
    throw new Error('Index must be a non-negative number');
  }
  let letter = '';
  while (index >= 0) {
    letter = String.fromCharCode((index % 26) + 65) + letter;
    index = Math.floor(index / 26) - 1;
  }
  return letter;
}

export const PLAYER_COLOR_TEXT: Record<PLAYER_COLOR, string> = {
  blue: 'Niebiescy',
  green: 'Zieloni',
  yellow: 'Żółci'
};
