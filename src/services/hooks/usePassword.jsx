import React from 'react';

const usePassword = () => {
  const [isPasswordHidden, setIsPasswordHidden] = React.useState(true);

  const hidePassword = React.useCallback((e) => {
    if (e.target.name !== 'password') {
      setIsPasswordHidden(true);
      window.removeEventListener('click', hidePassword);
    }
  }, [])

  const showPassword = () => {
    if (isPasswordHidden) {
      setIsPasswordHidden(false);
      window.addEventListener('click', hidePassword);
    }
    else {
      setIsPasswordHidden(true);
      window.removeEventListener('click', hidePassword);
    }
  }

  return {
    isPasswordHidden,
    showPassword
  }
}

export default usePassword;
