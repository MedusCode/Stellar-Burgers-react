import React from 'react';

const usePassword = () => {
  const [isPasswordHidden, setIsPasswordHidden] = React.useState(true);

  const onPasswordBlur = () => {
    setIsPasswordHidden(true);
  }

  const showPassword = e => {
    e.preventDefault();
    const passwordInput =  e.currentTarget.parentNode.querySelector('input');
    setTimeout(function(){
      passwordInput.selectionStart = passwordInput.selectionEnd = passwordInput.value.length;
      passwordInput.focus();
    }, 0) // Использовал setTimeout, из-за бага в Chrome
    setIsPasswordHidden(!isPasswordHidden)
  }

  return {
    isPasswordHidden,
    onPasswordBlur,
    showPassword
  }
}

export default usePassword;
