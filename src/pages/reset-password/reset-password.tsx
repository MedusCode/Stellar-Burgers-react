import { FC, useState, useEffect, FormEvent, FocusEvent } from 'react';
import { useSelector } from '../../services/hooks/reduxHooks';
import { useLocation, Redirect } from 'react-router-dom';
import styles from './reset-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormMessage from '../../components/form-message/form-message';
import FormResult, { IFormResultProps } from '../../components/form-result/form-result';
import useForm from '../../services/hooks/useForm';
import usePassword from '../../services/hooks/usePassword';
import baseUrl from "../../assets/scripts/baseUrl";
import checkResponse from "../../assets/scripts/checkResponse";
import IRequestStatus from '../../types/requestStatus';
import ILocation from '../../types/location';

const ResetPassword: FC = () => {
  const location = useLocation<ILocation>();
  const isAuthorized = useSelector(store => store.user.isAuthorized)
  const { values, onChange, onBlur, invalid, buttonDisability } = useForm({password: '', token: ''});
  const { isPasswordHidden, onPasswordBlur, showPassword } = usePassword();
  const [ resetStatus, setResetStatus ] = useState<IRequestStatus>({loading: false, success: false, error: false});
  const [ requestResult, setRequestResult ] = useState<IFormResultProps>({ message: '', buttonText: '', href: '' });

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
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

  const handlePasswordBlur = (e: FocusEvent<HTMLInputElement>) => {
    onBlur(e);
    onPasswordBlur();
  }

  useEffect(() => {
    if (resetStatus.loading) setRequestResult({message: '???????????????? ????????????...', buttonText: '', href: ''});
    else if (resetStatus.success) setRequestResult({message: '???????????? ?????????????? ??????????????.', buttonText: '??????????', href: '/login'});
    else if (resetStatus.error) setRequestResult({message: '???? ?????????????? ???????????????????????? ????????????', buttonText: '?????????????????? ??????????', href: '/login'});
  }, [resetStatus])

  if (isAuthorized) {
    return (<Redirect to={{ pathname: '/' }} />)
  }

  if (location.state === undefined || location.state.access === undefined) {
    return (<Redirect to={{ pathname: '/forgot-password' }} />)
  }

  return (
    <div className={styles.container}>
      <h1 className='text text_type_main-medium mb-6'>???????????????????????????? ????????????</h1>
      {!resetStatus.error && !resetStatus.success && !resetStatus.loading  &&
        <>
          <form className={`${styles.form} mb-20`} onSubmit={handleReset}>
            <div className={`${invalid.password ? styles.invalid : styles.valid} ${styles.input}`}>
              <Input
                onChange={onChange}
                onBlur={handlePasswordBlur}
                value={values.password}
                type={isPasswordHidden ? 'password' : 'text'}
                name={'password'}
                placeholder={'?????????????? ?????????? ????????????'}
                icon={isPasswordHidden ? 'ShowIcon' : 'HideIcon'}
                onIconClick={showPassword}
                errorText={'???????????? ???????????? ???????? ?????????????? 5 ????????????????'}
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
                placeholder={'?????????????? ?????? ???? ????????????'}
                errorText={'?????????????? ??????, ???????????????????????? ???? ??????????'}
                error={invalid.token}
              />
            </div>
            <Button type="primary" size="medium" disabled={buttonDisability}>??????????????????</Button>
          </form>
          <FormMessage message='?????????????????? ?????????????' linkText='??????????' link='/login' replace={true}/>
        </>
      }
      {(resetStatus.error || resetStatus.success || resetStatus.loading) && 
        <FormResult message={requestResult.message} buttonText={requestResult.buttonText} href={requestResult.href} />
      }
    </div>
  )
}

export default ResetPassword;
