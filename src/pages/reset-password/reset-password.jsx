import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
import styles from './reset-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormMessage from '../../components/form-message/form-message';
import FormResult from '../../components/form-result/form-result';
import useForm from '../../services/hooks/useForm';
import usePassword from '../../services/hooks/usePassword';
import baseUrl from "../../assets/scripts/baseUrl";
import checkResponse from "../../assets/scripts/checkResponse";

const ResetPassword = () => {
  const location = useLocation();
  const isAuthorized = useSelector(store => store.user.isAuthorized)
  const { values, onChange, onBlur, invalid, buttonDisability } = useForm({password: '', token: ''});
  const { isPasswordHidden, onPasswordBlur, showPassword } = usePassword();
  const [ resetStatus, setResetStatus ] = React.useState({loading: false, success: false, error: false});
  const [ requestResult, setRequestResult ] = React.useState({ message: '', buttonText: '', href: '' });

  const handleReset = e => {
    e.preventDefault();
    setResetStatus({loading: true, success: false, error: false});

    fetch(`${baseUrl}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(checkResponse)
      .then(data => {
        if (data.success) setResetStatus({loading: false, success: true, error: false});
        else return Promise.reject('error');
      })
      .catch(() => {
        setResetStatus({loading: false, success: false, error: true});
      });
  }

  const handlePasswordBlur = e => {
    onBlur(e);
    onPasswordBlur();
  }

  React.useEffect(() => {
    if (resetStatus.loading) setRequestResult({message: 'Отправка данных...', buttonText: '', href: ''});
    else if (resetStatus.success) setRequestResult({message: 'Пароль успешно сброшен.', buttonText: 'Войти', href: '/login'});
    else if (resetStatus.error) setRequestResult({message: 'Не удалось восстановить пароль', buttonText: 'Вернуться назад', href: '/login'});
  }, [resetStatus])

  if (isAuthorized) {
    return (<Redirect to={{ pathname: '/' }} />)
  }

  if (location.state === undefined || location.state.access === undefined) {
    return (<Redirect to={{ pathname: '/forgot-password' }} />)
  }

  return (
    <div className={styles.container}>
      <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
      {!resetStatus.error && !resetStatus.success && !resetStatus.loading  &&
        <>
          <form className={`${styles.form} mb-20`}>
            <div className={`${invalid.password ? styles.invalid : styles.valid} ${styles.input}`}>
              <Input
                onChange={onChange}
                onBlur={handlePasswordBlur}
                value={values.password}
                type={isPasswordHidden ? 'password' : 'text'}
                name={'password'}
                placeholder={'Введите новый пароль'}
                icon={isPasswordHidden ? 'ShowIcon' : 'HideIcon'}
                onIconClick={showPassword}
                errorText={'Пароль должен быть длиннее 5 символов'}
                error={invalid.password}
              />
            </div>
            <div className={`${invalid.token ? styles.invalid : styles.valid} ${styles.input}`}>
              <Input
                onChange={onChange}
                onBlur={onBlur}
                value={values.token}
                type={'text'}
                name={'token'}
                placeholder={'Введите код из письма'}
                errorText={'Введите код, отправленный на почту'}
                error={invalid.token}
              />
            </div>
            <Button onClick={handleReset} type="primary" size="medium" disabled={buttonDisability}>Сохранить</Button>
          </form>
          <FormMessage message='Вспомнили пароль?' linkText='Войти' link='/login' replace={true}/>
        </>
      }
      {(resetStatus.error || resetStatus.success || resetStatus.loading) && 
        <FormResult message={requestResult.message} buttonText={requestResult.buttonText} href={requestResult.href} />
      }
    </div>
  )
}

export default ResetPassword;
