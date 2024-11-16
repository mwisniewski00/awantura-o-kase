import { useCallback, useMemo, useState } from 'react';
import { Errors, FieldsIds, FieldsValidators, FormInput } from './validation';

export function useFormValidation(fields: FormInput[]) {
  const [errors, setErrors] = useState<Errors>({});
  const getErrors = useCallback(
    () =>
      fields.reduce<Errors>((errorsResult, field) => {
        const fieldValue = document.getElementById(FieldsIds[field]) as HTMLInputElement;
        const { isValid, errorMessage } = FieldsValidators[field](fieldValue);
        if (!isValid) {
          errorsResult[field] = errorMessage;
        }
        return errorsResult;
      }, {}),
    [fields]
  );

  const validate = useCallback(() => setErrors(getErrors()), [getErrors]);

  return useMemo(() => ({ validate, errors }), [errors, validate]);
}
