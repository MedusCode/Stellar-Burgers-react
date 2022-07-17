import {ChangeEvent, FocusEvent, useState} from 'react';
import TInputsValues from '../../types/inputsValues';
import useValidation, { IUseValidationReturns } from './useValidation';

interface IUseFormReturns {
  values: TInputsValues;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
  resetPassword: () => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus: (e: FocusEvent<HTMLInputElement>) => void;
}

const useForm = (initialValues: TInputsValues): IUseFormReturns & Omit<IUseValidationReturns, 'validate'> => {
  const [ values, setValues ] = useState(initialValues);
  const { invalid, buttonDisability, validate } = useValidation(values);

  const resetForm = () => {
    setValues(initialValues);
  }

  const resetPassword = () => {
    setValues({...values, password: ''})
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [e.target.name]: e.target.value});
    validate(e.target);
  }

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    validate(e.target);
  }

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    validate(e.target);
  }

  return {
    values,
    onChange,
    resetForm,
    resetPassword,
    onBlur,
    onFocus,
    invalid,
    buttonDisability,
  }
}

export default useForm;
