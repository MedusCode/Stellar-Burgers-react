import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import styles from './forgot-password.module.css';
import FormMessage from '../../components/form-message/form-message';
import FormResult from '../../components/form-result/form-result';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../services/hooks/useForm';
import baseUrl from "../../assets/scripts/baseUrl";
import checkResponse from "../../assets/scripts/checkResponse";

const ForgotPassword = () => {
  const history = useHistory();
  const isAuthorized = useSelector(store => store.user.isAuthorized)
  const { values, onChange, onBlur, invalid, buttonDisability } = useForm({email: ''});
  const [ resetStatus, setResetStatus ] = React.useState({loading: false, success: false, error: false});
  const [ requestResult, setRequestResult ] = React.useState({ message: '', buttonText: '' });

  const moveNextStep = React.useCallback(() => {
    history.push({ pathname: '/reset-password', state: { access: true } });
  }, [history]);

  const reset = () => {
    setResetStatus({loading: false, success: false, error: false});
  }

  const handleReset = e => {
    e.preventDefault();
    setResetStatus({loading: true, success: false, error: false});

    fetch(`${baseUrl}/password-reset`, {
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

  React.useEffect(() => {
    if (resetStatus.loading) setRequestResult({message: 'Отправка данных...', buttonText: ''});
    else if (resetStatus.success) moveNextStep();
    else if (resetStatus.error) setRequestResult({message: 'Ошибка сервера', buttonText: 'Попробовать еще раз'});
  }, [resetStatus])

  if (isAuthorized) {
    return (<Redirect to={{ pathname: '/' }} />)
  }

  return (
    <div className={styles.container}>
      <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
      {!resetStatus.error && !resetStatus.success && !resetStatus.loading &&
        <>
          <form className={`${styles.form} mb-20`} onSubmit={handleReset}>
            <div className={`${invalid.email ? styles.invalid : styles.valid} ${styles.input}`}>
              <Input
                onChange={onChange}
                onBlur={onBlur}
                value={values.email}
                type={'email'}
                name={'email'}
                placeholder={'Укажите e-mail'}
                errorText={'Невозможный email'}
                error={invalid.email}
              />
            </div>
            <Button type="primary" size="medium" disabled={buttonDisability}>Восстановить</Button>
          </form>
          <FormMessage message='Вспомнили пароль?' linkText='Войти' link='/login' />
        </>
      }
      {(resetStatus.error || resetStatus.success || resetStatus.loading) && 
        <FormResult message={requestResult.message} buttonText={requestResult.buttonText} reset={reset}/>
      }
    </div>
  )
}

export default ForgotPassword;
