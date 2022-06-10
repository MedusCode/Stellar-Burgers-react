import React from 'react';
import useValidation from './useValidation';

const useForm = (inputNames, isValidationNeeded = false) => {
  const initialValuesState = Object.fromEntries(inputNames.map(name => [name, '']));
  const [ values, setValues ] = React.useState(initialValuesState);
  const { invalid, buttonDisability, validate } = useValidation(values);

  const resetForm = () => {
    setValues(initialValuesState);
  }

  const resetPassword = () => {
    setValues({...values, password: ''})
  }

  const onChange = e => {
    setValues({...values, [e.target.name]: e.target.value});
    isValidationNeeded && validate(e.target);
  }

  const onBlur = e => {
    isValidationNeeded && validate(e.target);
  }

  return {
    values,
    onChange,
    resetForm,
    resetPassword,
    onBlur,
    invalid,
    buttonDisability
  }
}

export default useForm;
