import { useState, MouseEvent } from 'react';

interface usePasswordReturns {
  isPasswordHidden: boolean;
  onPasswordBlur: () => void;
  showPassword: (e: MouseEvent<HTMLDivElement>) => void;
}

const usePassword = (): usePasswordReturns => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  const onPasswordBlur = () => {
    setIsPasswordHidden(true);
  }

  const showPassword = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const passwordInput =  e.currentTarget.parentNode?.querySelector('input');
    if (passwordInput) {
      setTimeout(function(){
        passwordInput.selectionStart = passwordInput.selectionEnd = passwordInput.value.length;
        passwordInput.focus();
      }, 0) // Использовал setTimeout, из-за бага в Chrome
      setIsPasswordHidden(!isPasswordHidden)
    }
  }

  return {
    isPasswordHidden,
    onPasswordBlur,
    showPassword
  }
}

export default usePassword;
