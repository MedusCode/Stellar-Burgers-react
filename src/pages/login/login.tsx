import { FC, useState, useEffect, useCallback, FormEvent } from 'react';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import { useDispatch } from '../../services/hooks/reduxHooks';
import styles from './login.module.css';
import FormMessage from '../../components/form-message/form-message';
import FormResult, { IFormResultProps } from '../../components/form-result/form-result';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../services/hooks/useForm';
import useUserStatus from '../../services/hooks/useUserStatus';
import { loginRequest, RESET_USER_REQUEST_STATUS } from '../../services/actions/user';
import ILocation from '../../types/location';

const Login: FC = () => {
  const dispatch = useDispatch();
  const state = useLocation<ILocation>().state;
  const history = useHistory();
  const { isAuthorized, request, requestFailed, errorStatus, isRequested } = useUserStatus();
  const { values, onChange, resetPassword } = useForm({email: '', password: ''});
  const [ buttonDisability, setButtonDisability ] = useState<boolean>(true);
  const [ requestResult, setRequestResult ] = useState<IFormResultProps>({ message: '', buttonText: '' });

  const handleAuthorization = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginRequest(values));
  }

  const login = useCallback(() => {
    history.replace(state?.from?.pathname || '/');
    dispatch({ type: RESET_USER_REQUEST_STATUS });
  }, [history]);

  useEffect(() => {
    if (Object.values(values).includes('')) setButtonDisability(true);
    else setButtonDisability(false);
  }, [values])
  
  useEffect(() => {
    !isRequested && resetPassword();
  }, [isRequested])

  useEffect(() => {
    if (request) setRequestResult({message: 'Авторизация...', buttonText: ''})
    else if (isAuthorized) login()
    else if (errorStatus === 401) setRequestResult({message: 'Неправильный email или пароль', buttonText: 'Попробовать еще раз'})
    else if (requestFailed) setRequestResult({message: 'Ошибка сервера', buttonText: 'Попробовать еще раз'})
  }, [isAuthorized, request, requestFailed, errorStatus])
  
  if (isAuthorized) {
    return (<Redirect to={{ pathname: '/' }} />)
  }

  return (
    <div className={styles.container}>
      <h1 className='text text_type_main-medium mb-6'>Вход</h1>
      {!isRequested &&
        <>
          <form className={`${styles.form} mb-20`} onSubmit={handleAuthorization}>
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
            <Button type="primary" size="medium" disabled={buttonDisability}>Войти</Button>
          </form>
          <FormMessage 
            message='Вы — новый пользователь?' 
            linkText='Зарегистрироваться' 
            link={{ pathname: '/register', state: state }} 
          />
          <FormMessage message='Забыли пароль?' linkText='Восстановить пароль' link='/forgot-password' />
        </>
      }
      {isRequested && <FormResult message={requestResult.message} buttonText={requestResult.buttonText}/>}
    </div>
  )
}

export default Login;
