import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './login.module.css';
import FormMessage from '../../components/form-message/form-message';
import FormResult from '../../components/form-result/form-result';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../services/hooks/useForm';
import useUserStatus from '../../services/hooks/useUserStatus';
import { loginRequest, RESET_REQUEST_STATUS } from '../../services/actions/user';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthorized, request, requestFailed, errorStatus, isRequested } = useUserStatus();
  const { values, onChange, resetPassword } = useForm({email: '', password: ''});
  const [ buttonDisability, setButtonDisability ] = React.useState(true);
  const [ requestResult, setRequestResult ] = React.useState({ message: '', buttonText: '' });

  const handleAuthorization = e => {
    e.preventDefault();
    dispatch(loginRequest(values));
  }

  const login = React.useCallback(() => {
    history.replace({ pathname: '/' });
    dispatch({ type: RESET_REQUEST_STATUS });
  }, [history]);

  React.useEffect(() => {
    if (Object.values(values).includes('')) setButtonDisability(true);
    else setButtonDisability(false);
  }, [values])
  
  React.useEffect(() => {
    !isRequested && resetPassword();
  }, [isRequested])

  React.useEffect(() => {
    if (request) setRequestResult({message: 'Авторизация...', buttonText: ''})
    else if (isAuthorized) login()
    else if (errorStatus === 401) setRequestResult({message: 'Неправильный email или пароль', buttonText: 'Попробовать еще раз'})
    else if (requestFailed) setRequestResult({message: 'Ошибка сервера', buttonText: 'Попробовать еще раз'})
  }, [isAuthorized, request, requestFailed, errorStatus])

  return (
    <div className={styles.container}>
      <h1 className='text text_type_main-medium mb-6'>Вход</h1>
      {!isRequested &&
        <>
          <form className={`${styles.form} mb-20`}>
            <Input
              onChange={onChange}
              value={values.email}
              type={'text'}
              name={'email'}
              placeholder={'E-mail'}
            />
            <PasswordInput
              onChange={onChange}
              value={values.password}
              name={'password'}
            />
            <Button onClick={handleAuthorization} type="primary" size="medium" disabled={buttonDisability}>Войти</Button>
          </form>
          <FormMessage message='Вы — новый пользователь?' linkText='Зарегистрироваться' link='/register' />
          <FormMessage message='Забыли пароль?' linkText='Восстановить пароль' link='/forgot-password' />
        </>
      }
      {isRequested && <FormResult message={requestResult.message} buttonText={requestResult.buttonText}/>}
    </div>
  )
}

export default Login;
