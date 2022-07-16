import { useState, useEffect } from 'react';
import checkIfEmailInvalid from '../../assets/scripts/checkIfEmailInvalid';
import TInputValues from '../../types/inputsValues';

type TInputsValidation = {
  [inputName: string]: boolean;
}

export interface IUseValidationReturns {
  invalid: TInputsValidation;
  buttonDisability: boolean;
  validate: (input: HTMLInputElement) => void;
}

const useValidation = (values: TInputValues): IUseValidationReturns => {
  const invalidInitialState: TInputsValidation = Object.fromEntries(Object.entries(values).map(([key]) => [key, false]));
  const [invalid, setInvalid] = useState<TInputsValidation>(invalidInitialState);
  const [buttonDisability, setButtonDisability] = useState<boolean>(true);

  const validate = (input: HTMLInputElement) => {
    if (input.name === 'email' && checkIfEmailInvalid(input.value)) setInvalid({...invalid, email: true})
    else if (input.name === 'password' && input.value.length < 6) setInvalid({...invalid, password: true})
    else if (input.value === '') setInvalid({...invalid, [input.name]: true});
    else setInvalid({...invalid, [input.name]: false});
  }

  useEffect(() => {
    if (Object.values(values).includes('') || Object.values(invalid).includes(true)) {
      setButtonDisability(true);
    }
    else setButtonDisability(false);
  }, [invalid, values])

  return {
    invalid,
    buttonDisability,
    validate
  }
}

export default useValidation;
