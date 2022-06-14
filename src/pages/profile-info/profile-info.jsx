import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './profile-info.module.css';
import useForm from '../../services/hooks/useForm';
import usePassword from '../../services/hooks/usePassword';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
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
    resetForm();
    onPasswordBlur();
  }

  const handleEsc = e => {
    if (e.key === 'Escape') lockInput();
  }

  const handleMissClick = e => {
    const targetName = e.target.name;
    targetName !== activeInput && targetName !== 'showButton' && targetName !== 'submitButton' && lockInput() && console.log('hey')
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

  const submitForm = () => {
    dispatch(updateUserRequest({ [activeInput]: values[activeInput] }));
  }

  const openConfirmationModal = e => {
    e.preventDefault()
    document.getElementsByName(activeInput)[0].blur();
    dispatch({ 
      type: OPEN_MODAL, 
      confirmationType: activeInput,
      newValue: activeInput !== 'password' ? values[activeInput] : '', 
      handler: submitForm 
    });
  }

  React.useEffect(() => {
    if (activeInput) {
      window.addEventListener('click', handleMissClick);
      document.addEventListener('keydown', handleEsc);
    }
    else {
      window.removeEventListener('click', handleMissClick);
      document.removeEventListener('keydown', handleEsc); 
    }
    return () => {
      window.removeEventListener('click', handleMissClick);
      document.removeEventListener('keydown', handleEsc)
    }
  }, [activeInput, setActiveInput])

  React.useEffect(() => {
    resetForm();
  }, [user, requestFailed])

  React.useEffect(() => {
    !isModalOpened && setActiveInput('')
  }, [isModalOpened])
  
  return (
    <div className={styles.container}>
      <form className={`${invalid.name && activeInput === 'name' ? styles.invalid : styles.valid} ${styles.form}`} onSubmit={e => e.preventDefault()}>
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
        {activeInput === 'name' ? 
          <button 
            className={styles.submitButton} 
            onClick={openConfirmationModal} 
            disabled={invalid.name || values.name === user.name} 
            name='submitButton' 
          />
        : ''}
      </form>
      <form className={`${invalid.email && activeInput === 'email' ? styles.invalid : styles.valid} ${styles.form}`} onSubmit={e => e.preventDefault()}>
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
        {activeInput === 'email' ? 
          <button 
            className={styles.submitButton} 
            onClick={openConfirmationModal} 
            disabled={invalid.email || values.email.toLowerCase() === user.email} 
            name='submitButton' 
          />
        : ''}
      </form>
      <form className={`${invalid.password && activeInput === 'password' ? styles.invalid : styles.valid} ${styles.form}`} onSubmit={e => e.preventDefault()}>
        <Input
          type={isPasswordHidden ? 'password' : 'text'}
          placeholder={'Пароль'}
          onChange={onChange}
          onFocus={onFocus}
          icon={activeInput === 'password' ? '' : 'EditIcon'}
          value={activeInput === 'password' ? values.password : '*********'}
          name={'password'}
          disabled={activeInput !== 'password'}
          onIconClick={unlockInput}
          errorText={'Пароль должен быть длиннее 5 символов'}
          error={activeInput === 'password' ? invalid.password : false}
        />
        {activeInput === 'password' ? <>
          <button 
            className={styles.submitButton} 
            onClick={openConfirmationModal} 
            disabled={invalid.password || values.password === user.password} 
            name='submitButton' 
          />
          <button className={isPasswordHidden ? styles.showButton : styles.hideButton} onClick={showPassword} name='showButton' />
          </>
        : ''}
      </form>
    </div>
  )
}

export default ProfileInfo;