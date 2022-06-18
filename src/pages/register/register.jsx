import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import styles from './register.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormMessage from '../../components/form-message/form-message';
import FormResult from '../../components/form-result/form-result';
import usePassword from '../../services/hooks/usePassword';
import useForm from '../../services/hooks/useForm';
import useUserStatus from '../../services/hooks/useUserStatus';
import { registerRequest, RESET_USER_REQUEST_STATUS } from '../../services/actions/user';


const Register = () => {
  const dispatch = useDispatch();
  const state = useLocation().state;
  const history = useHistory();
  const { isAuthorized, request, requestFailed, errorMessage, isRequested } = useUserStatus();
  const { values, onChange, onBlur, invalid, buttonDisability, resetPassword } = useForm({name: '', email: '', password: ''});
  const { isPasswordHidden, onPasswordBlur, showPassword } = usePassword();
  const [ requestResult, setRequestResult ] = React.useState({ message: '', buttonText: '', href: ''});

  const handleRegistration = e => {
    e.preventDefault();
    dispatch(registerRequest(values));
  }

  const handlePasswordBlur = e => {
    onBlur(e);
    onPasswordBlur();
  }

  const login = React.useCallback(() => {
    history.replace(state?.from.pathname || '/');
    dispatch({ type: RESET_USER_REQUEST_STATUS });
  }, [history]);

  React.useEffect(() => {
    !isRequested && resetPassword();
  }, [isRequested])

  React.useEffect(() => {
    if (request) setRequestResult({message: 'Отправка данных...', buttonText: '', href: ''})
    else if (isAuthorized) login();
    else if (errorMessage === 'User already exists') setRequestResult({
      message: 'Данный Email уже зарегистрирован', 
      buttonText: 'Попробовать войти', 
      href: '/login'
    })
    else if (requestFailed) setRequestResult({message: 'Ошибка сервера', buttonText: 'Попробовать еще раз', href: ''})
  }, [isAuthorized, request, requestFailed, errorMessage])
  
  if (isAuthorized) {
    return (<Redirect to={{ pathname: '/' }} />)
  }

  return (
    <div className={styles.container}>
      <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
      {!isRequested &&
        <>
          <form className={`${styles.form} mb-20`} onSubmit={handleRegistration}>
            <div className={`${invalid.name ? styles.invalid : styles.valid} ${styles.input}`}>
              <Input
                onChange={onChange}
                onBlur={onBlur}
                value={values.name}
                type={'text'}
                name={'name'}
                placeholder={'Имя'}
                errorText={'Введите свое имя'}
                error={invalid.name}
              />
            </div>
            <div className={`${invalid.email ? styles.invalid : styles.valid} ${styles.input}`}>
              <Input
                onChange={onChange}
                onBlur={onBlur}
                value={values.email}
                type={'email'}
                name={'email'}
                placeholder={'E-mail'}
                errorText={'Невозможный email'}
                error={invalid.email}
              />
            </div>
            <div className={`${invalid.password ? styles.invalid : styles.valid} ${styles.input}`}>
              <Input
                onChange={onChange}
                onBlur={handlePasswordBlur}
                value={values.password}
                type={isPasswordHidden ? 'password' : 'text'}
                name={'password'}
                placeholder={'Пароль'}
                icon={isPasswordHidden ? 'ShowIcon' : 'HideIcon'}
                onIconClick={showPassword}
                errorText={'Пароль должен быть длиннее 5 символов'}
                error={invalid.password}
              />
            </div>
            <Button type="primary" size="medium" disabled={buttonDisability}>
              Зарегистрироваться
            </Button>
          </form>
          <FormMessage message='Уже зарегистрированы?' linkText='Войти' link='/login' />
        </>
      }
      {isRequested && <FormResult message={requestResult.message} buttonText={requestResult.buttonText} href={requestResult.href} />}
    </div>
  )
}

export default Register;
