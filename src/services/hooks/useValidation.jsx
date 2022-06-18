import React from 'react';
import checkIfEmailInvalid from '../../assets/scripts/checkIfEmailInvalid';

const useValidation = (values) => {
  const invalidInitialState = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, false]));
  const [invalid, setInvalid] = React.useState(invalidInitialState);
  const [buttonDisability, setButtonDisability] = React.useState(true);

  const validate = input => {
    if (input.name === 'email' && checkIfEmailInvalid(input.value)) setInvalid({...invalid, email: true})
    else if (input.name === 'password' && input.value.length < 6) setInvalid({...invalid, password: true})
    else if (input.value === '') setInvalid({...invalid, [input.name]: true});
    else setInvalid({...invalid, [input.name]: false});
  }

  React.useEffect(() => {
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
