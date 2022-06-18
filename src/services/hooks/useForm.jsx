import React from 'react';
import useValidation from './useValidation';

const useForm = (initialValues) => {
  const [ values, setValues ] = React.useState(initialValues);
  const { invalid, buttonDisability, validate } = useValidation(values);

  const resetForm = () => {
    setValues(initialValues);
  }

  const resetPassword = () => {
    setValues({...values, password: ''})
  }

  const onChange = e => {
    setValues({...values, [e.target.name]: e.target.value});
    validate(e.target);
  }

  const onBlur = e => {
    validate(e.target);
  }

  const onFocus = e => {
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
