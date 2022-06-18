import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './profile-info.module.css';
import useForm from '../../services/hooks/useForm';
import usePassword from '../../services/hooks/usePassword';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUserRequest } from '../../services/actions/user.jsx';
import { OPEN_MODAL } from '../../services/actions/modal';

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const { isPasswordHidden, onPasswordBlur, showPassword } = usePassword();
  const isModalOpened = useSelector(store => store.modal.isOpen);
  const requestFailed = useSelector(store => store.user.requestFailed);
  const user = useSelector(store => store.user.user)
  const [ activeInput, setActiveInput ] = React.useState('');
  const { values, onChange, onFocus, invalid, resetForm } = useForm({name: user.name, email: user.email, password: ''});

  const lockInput = () => {
    document.getElementsByName(activeInput)[0].blur();
    setActiveInput('');
    onPasswordBlur();
  }

  const handleEsc = e => {
    if (e.key === 'Escape') lockInput();
  }

  const unlockInput = e => {
    const input = e.currentTarget.parentNode.parentNode.querySelector('input');
    resetForm();
    setTimeout(function(){
      input.selectionStart = input.selectionEnd = input.value.length;
      input.focus();
    }, 0) // Использовал setTimeout, из-за бага в Chrome
    setActiveInput(input.name);
  }

  const submitForm = e => {
    e.preventDefault()
    document.getElementsByName(activeInput)[0].blur();
    dispatch(updateUserRequest({ [activeInput]: values[activeInput] }));
    dispatch({ 
      type: OPEN_MODAL, 
      modalType: 'request',
    });
  }

  React.useEffect(() => {
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

  React.useEffect(() => {
    resetForm();
  }, [activeInput, user, requestFailed])

  React.useEffect(() => {
    !isModalOpened && setActiveInput('')
  }, [isModalOpened])
  
  return (
    <div className={styles.container}>
      <form className={`${invalid.name && activeInput === 'name' ? styles.invalid : styles.valid} ${styles.form}`} onSubmit={e => e.preventDefault()}>
        <div className={styles.formContainer}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onChange}
            onFocus={onFocus}
            icon={activeInput === 'name' ? '' : 'EditIcon'}
            value={values.name}
            name={'name'}
            disabled={activeInput !== 'name'}
            onIconClick={unlockInput}
            errorText={'Введите свое имя'}
            error={activeInput === 'name' ? invalid.name : false}
          />
          <div className={`${styles.buttonsContainer} ${activeInput === 'name' ? styles.buttonsContainerActive : ''}`}>
            <Button 
                type="primary" 
                size="small" 
                onClick={submitForm} 
                disabled={invalid.name || values.name === user.name} 
                name='submitButton'
              >
                Сохранить
              </Button>
            <Button type="secondary" onClick={lockInput} disabled={activeInput !== 'name'} size="small">Отменить</Button>
          </div>
        </div>
      </form>
      <form className={`${invalid.email && activeInput === 'email' ? styles.invalid : styles.valid} ${styles.form}`} onSubmit={e => e.preventDefault()}>
        <div className={styles.formContainer}>
          <Input
            type={'text'}
            placeholder={'Логин'}
            onChange={onChange}
            onFocus={onFocus}
            icon={activeInput === 'email' ? '' : 'EditIcon'}
            value={values.email}
            name={'email'}
            disabled={activeInput !== 'email'}
            onIconClick={unlockInput}
            errorText={'Невозможный email'}
            error={activeInput === 'email' ? invalid.email : false}
          />
          <div className={`${styles.buttonsContainer} ${activeInput === 'email' ? styles.buttonsContainerActive : ''}`}>
            <Button 
                type="primary" 
                size="small" 
                onClick={submitForm} 
                disabled={invalid.email || values.email.toLowerCase() === user.email} 
                name='submitButton'
              >
                Сохранить
              </Button>
            <Button type="secondary" onClick={lockInput} disabled={activeInput !== 'email'} size="small">Отменить</Button>
          </div>
        </div>
      </form>
      <form className={`${invalid.password && activeInput === 'password' ? styles.invalid : styles.valid} ${styles.form}`} onSubmit={e => e.preventDefault()}>
        <div className={styles.formContainer}>
          <Input
            type={isPasswordHidden ? 'password' : 'text'}
            placeholder={'Пароль'}
            onChange={onChange}
            onFocus={onFocus}
            icon={activeInput === 'password' ? isPasswordHidden ? 'ShowIcon' : 'HideIcon' : 'EditIcon'}
            value={activeInput === 'password' ? values.password : '*********'}
            name={'password'}
            disabled={activeInput !== 'password'}
            onIconClick={activeInput === 'password' ? showPassword : unlockInput}
            errorText={'Пароль должен быть длиннее 5 символов'}
            error={activeInput === 'password' ? invalid.password : false}
          />
          <div className={`${styles.buttonsContainer} ${activeInput === 'password' ? styles.buttonsContainerActive : ''}`}>
            <Button 
                type="primary" 
                size="small" 
                onClick={submitForm} 
                disabled={invalid.password} 
                name='submitButton'
              >
                Сохранить
              </Button>
            <Button type="secondary" onClick={lockInput} disabled={activeInput !== 'password'} size="small">Отменить</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProfileInfo;