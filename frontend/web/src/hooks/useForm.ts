import { useState, useCallback } from 'react';
import { ValidationErrors } from '../utils/validation';

// Define a type for form field values that can handle different input types
type FieldValue = string | number | boolean | File | null;

// Generic constraint to ensure T is an object with appropriate field values
type FormData = Record<string, FieldValue>;

interface UseFormReturn<T extends FormData> {
  values: T;
  errors: ValidationErrors;
  touched: { [K in keyof T]?: boolean };
  //handleChange: (name: keyof T, value: any) => void;
  // Make handleChange type-safe by ensuring value matches the field type
  handleChange: <K extends keyof T>(name: K, value: T[K]) => void;
  handleBlur: (name: keyof T) => void;
  setErrors: (errors: ValidationErrors) => void;
  resetForm: () => void;
  isValid: boolean;
}

export function useForm<T extends FormData>(
  initialValues: T,
  validate?: (values: T) => ValidationErrors
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [K in keyof T]?: boolean }>({});

  const handleChange = useCallback(<K extends keyof T>(name: K, value: T[K]) => {
    setValues(prev => ({ ...prev, [name]: value }));
    if (validate) {
      const validationErrors = validate({ ...values, [name]: value });
      setErrors(validationErrors);
    }
  }, [values, validate]);

  const handleBlur = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setErrors,
    resetForm,
    isValid,
  };
}
