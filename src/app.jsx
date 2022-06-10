import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './app.module.css';
import AppHeader from './components/app-header/app-header';
import Constructor from './pages/constructor/constructor';
import Login from './pages/login/login';
import Register from './pages/register/register';
import ForgotPassword from './pages/forgot-password/forgot-password';
import ResetPassword from './pages/reset-password/reset-password';
import Profile from './pages/profile/profile';
import Modal from './components/modal/modal';
import IngredientDetails from './components/ingredient-details/ingredient-details';
import OrderDetails from './components/order-details/order-details';
import { CLOSE_MODAL } from './services/actions/modal';
import { getIngredients } from './services/actions/ingredients';
import { userRequest } from './services/actions/user';

const App = () => {
  const dispatch = useDispatch();
  const { isModalOpened, modalType } = useSelector(store => ({
    isModalOpened: store.modal.isOpen,
    modalType: store.modal.type
  }));

  const closeCommonModal = () => {
    dispatch({type: CLOSE_MODAL})
  }

  React.useEffect(() => {
    dispatch(getIngredients())
    dispatch(userRequest());
  }, [])

  return (
    <BrowserRouter>
      <AppHeader />
        <main className={`${styles.main} pr-5 pl-5`}>
          <Switch>
            <Route path="/login" exact={true}>
              <Login />
            </Route>
            <Route path="/register" exact={true}>
              <Register />
            </Route>
            <Route path="/forgot-password" exact={true}>
              <ForgotPassword />
            </Route>
            <Route path="/reset-password" exact={true}>
              <ResetPassword />
            </Route>
            <Route path="/profile" exact={true}>
              <Profile />
            </Route>
            <Route path="/" exact={true}>
              <Constructor />
            </Route>
          </Switch>
      </main>
      {isModalOpened && (modalType === 'ingredient'
        ? <Modal title='Детали ингредиента' onClose={closeCommonModal}><IngredientDetails /></Modal>
        : <Modal onClose={closeCommonModal}><OrderDetails /></Modal>)
      }
    </BrowserRouter>
  )
}

export default App;
