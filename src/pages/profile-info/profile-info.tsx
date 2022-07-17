import { FC, useState, useEffect, MouseEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from '../../services/hooks/reduxHooks';
import styles from './profile-info.module.css';
import useForm from '../../services/hooks/useForm';
import usePassword from '../../services/hooks/usePassword';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUserRequest } from '../../services/actions/user';
import { OPEN_MODAL } from '../../services/actions/modal';

enum InputsNames {
  name = 'name',
  email = 'email',
  password = 'password',
  none = '',
}

const ProfileInfo: FC = () => {
  const dispatch = useDispatch();
  const { isPasswordHidden, onPasswordBlur, showPassword } = usePassword();
  const isModalOpened = useSelector(store => store.modal.isOpen);
  const requestFailed = useSelector(store => store.user.requestFailed);
  const user = useSelector(store => store.user.user)
  const [ activeInput, setActiveInput ] = useState<InputsNames>(InputsNames.none);
  const { values, onChange, onFocus, invalid, resetForm } = useForm({name: user.name, email: user.email, password: ''});

  const lockInput = () => {
    document.getElementsByName(activeInput)[0].blur();
    setActiveInput(InputsNames.none);
    onPasswordBlur();
  }

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') lockInput();
  }

  const unlockInput = (e: MouseEvent<HTMLDivElement>) => {
    const input = e?.currentTarget?.parentNode?.parentNode?.querySelector('input');
    if (input && input.name in InputsNames) {
      resetForm();
      setTimeout(function(){
        input.selectionStart = input.selectionEnd = input.value.length;
        input.focus();
      }, 0) // Использовал setTimeout, из-за бага в Chrome
      setActiveInput(input.name as InputsNames);
    }
  }

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    document.getElementsByName(activeInput)[0].blur();
    dispatch(updateUserRequest({ [activeInput]: values[activeInput] }));
    dispatch({ 
      type: OPEN_MODAL, 
      modalType: 'request',
    });
  }

  useEffect(() => {
    if (activeInput) {
      document.addEventListener('keydown', handleEsc);
    }
    else {
      document.removeEventListener('keydown', handleEsc); 
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [activeInput, setActiveInput])

  useEffect(() => {
    resetForm();
  }, [activeInput, user, requestFailed])

  useEffect(() => {
    !isModalOpened && setActiveInput(InputsNames.none)
  }, [isModalOpened])
  
  return (
    <div className={`${styles.container} mt-20`}>
      <form className={`${invalid.name && activeInput === InputsNames.name ? styles.invalid : styles.valid} ${styles.form}`} onSubmit={submitForm}>
        <div className={styles.formContainer}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onChange}
            onFocus={onFocus}
            icon={activeInput === InputsNames.name ? undefined : 'EditIcon'}
            value={values.name}
            name={InputsNames.name}
            disabled={activeInput !== InputsNames.name}
            onIconClick={unlockInput}
            errorText={'Введите свое имя'}
            error={activeInput === InputsNames.name ? invalid.name : false}
          />
          <div className={`${styles.buttonsContainer} ${activeInput === InputsNames.name ? styles.buttonsContainerActive : ''}`}>
            <Button 
                type="primary" 
                size="small" 
                disabled={invalid.name || values.name === user.name} 
                name='submitButton'
              >
                Сохранить
              </Button>
            <Button type="secondary" onClick={lockInput} disabled={activeInput !== InputsNames.name} size="small">Отменить</Button>
          </div>
        </div>
      </form>
      <form className={`${invalid.email && activeInput === InputsNames.email ? styles.invalid : styles.valid} ${styles.form}`} onSubmit={submitForm}>
        <div className={styles.formContainer}>
          <Input
            type={'text'}
            placeholder={'Логин'}
            onChange={onChange}
            onFocus={onFocus}
            icon={activeInput === InputsNames.email ? undefined : 'EditIcon'}
            value={values.email}
            name={InputsNames.email}
            disabled={activeInput !== InputsNames.email}
            onIconClick={unlockInput}
            errorText={'Невозможный email'}
            error={activeInput === InputsNames.email ? invalid.email : false}
          />
          <div className={`${styles.buttonsContainer} ${activeInput === InputsNames.email ? styles.buttonsContainerActive : ''}`}>
            <Button 
                type="primary" 
                size="small" 
                disabled={invalid.email || values.email.toLowerCase() === user.email} 
                name='submitButton'
              >
                Сохранить
              </Button>
            <Button type="secondary" onClick={lockInput} disabled={activeInput !== InputsNames.email} size="small">Отменить</Button>
          </div>
        </div>
      </form>
      <form className={`${invalid.password && activeInput === InputsNames.password ? styles.invalid : styles.valid} ${styles.form}`} onSubmit={submitForm}>
        <div className={styles.formContainer}>
          <Input
            type={isPasswordHidden ? 'password' : 'text'}
            placeholder={'Пароль'}
            onChange={onChange}
            onFocus={onFocus}
            icon={activeInput === InputsNames.password ? isPasswordHidden ? 'ShowIcon' : 'HideIcon' : 'EditIcon'}
            value={activeInput === InputsNames.password ? values.password : '*********'}
            name={InputsNames.password}
            disabled={activeInput !== InputsNames.password}
            onIconClick={activeInput === InputsNames.password ? showPassword : unlockInput}
            errorText={'Пароль должен быть длиннее 5 символов'}
            error={activeInput === InputsNames.password ? invalid.password : false}
          />
          <div className={`${styles.buttonsContainer} ${activeInput === InputsNames.password ? styles.buttonsContainerActive : ''}`}>
            <Button 
                type="primary" 
                size="small" 
                disabled={invalid.password} 
                name='submitButton'
              >
                Сохранить
              </Button>
            <Button type="secondary" onClick={lockInput} disabled={activeInput !== InputsNames.password} size="small">Отменить</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProfileInfo;