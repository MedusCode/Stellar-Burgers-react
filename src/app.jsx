import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/protected-route/protected-route';
import { useSelector, useDispatch } from 'react-redux';
import styles from './app.module.css';
import AppHeader from './components/app-header/app-header';
import Constructor from './pages/constructor/constructor';
import Login from './pages/login/login';
import Register from './pages/register/register';
import ForgotPassword from './pages/forgot-password/forgot-password';
import ResetPassword from './pages/reset-password/reset-password';
import Profile from './pages/profile/profile';
import Feed from './pages/feed/feed';
import Ingredients from './pages/ingredients/ingredients';
import NotFound from './pages/not-found/not-found';
import Modal from './components/modal/modal';
import IngredientDetails from './components/ingredient-details/ingredient-details';
import Confirmation from './components/confirmation/confirmation.jsx';
import OrderDetails from './components/order-details/order-details';
import RequestStatus from './components/request-status/request-status';
import LoadingPage from './components/loading-page/loading-page';
import { getIngredients } from './services/actions/ingredients';
import { getUserRequest } from './services/actions/user';

const App = () => {
  const dispatch = useDispatch();
  const tokenAuthorization = useSelector(store => store.user.tokenAuthorization)
  const ingredientsRequest = useSelector(store => store.ingredients.ingredientsRequest)
  const { isModalOpened, modalType } = useSelector(store => ({
    isModalOpened: store.modal.isOpen,
    modalType: store.modal.modalType
  }));

  const modalSwitch = () => {
    switch(modalType) {
      case 'ingredient': {
        return (<Modal title='Детали ингредиента'><IngredientDetails /></Modal>)
      }
      case 'order': {
        return (<Modal><OrderDetails /></Modal>)
      }
      case 'confirmation': {
        return (<Modal size='small'><Confirmation /></Modal>)
      }
      case 'request': {
        return (<Modal size='small'><RequestStatus /></Modal>)
      }
    }
  }

  React.useEffect(() => {
    dispatch(getIngredients())
    dispatch(getUserRequest());
  }, [])

  if (ingredientsRequest || tokenAuthorization) {
    return (<LoadingPage />)
  }

  return (
    <BrowserRouter>
      <AppHeader />
        <main className={`${styles.main} pr-5 pl-5`}>
          <Switch>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
            <Route path="/forgot-password" exact>
              <ForgotPassword />
            </Route>
            <Route path="/reset-password" exact>
              <ResetPassword />
            </Route>
            <ProtectedRoute path="/profile">
              <Profile />
            </ProtectedRoute>
            <Route path="/ingredients/:id" exact>
              <Ingredients />
            </Route>
            <Route path="/feed" exact>
              <Feed />
            </Route>
            <Route path="/" exact>
              <Constructor />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
      </main>
      {isModalOpened && modalSwitch()}
    </BrowserRouter>
  )
}

export default App;
