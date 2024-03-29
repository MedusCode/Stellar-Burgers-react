import { FC, useEffect } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import { useSelector, useDispatch } from '../../services/hooks/reduxHooks';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Constructor from '../../pages/constructor/constructor';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import Feed from '../../pages/feed/feed';
import Ingredients from '../../pages/ingredients/ingredients';
import NotFound from '../../pages/not-found/not-found';
import Modal, { ModalSize } from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Confirmation from '../confirmation/confirmation';
import Order from '../order/order';
import FullOrder from '../../pages/full-order/full-order';
import OrderDetails from '../order-details/order-details';
import RequestStatus from '../request-status/request-status';
import LoadingRocket from '../loading-rocket/loading-rocket';
import { getIngredients } from '../../services/actions/ingredients';
import { getUserRequest } from '../../services/actions/user';
import { CLOSE_MODAL } from '../../services/actions/modal';
import ILocation from '../../types/location';

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<ILocation>();
  const history = useHistory();
  const tokenAuthorization = useSelector(store => store.user.tokenAuthorization)
  const ingredientsRequest = useSelector(store => store.ingredients.ingredientsRequest)
  const { isModalOpened, modalType } = useSelector(store => ({
    isModalOpened: store.modal.isOpen,
    modalType: store.modal.modalType
  }));
  const background = location.state && location.state.background;

  useEffect(() => {
    window.history.replaceState({}, document.title)
  }, [ background ])

  const closeOrdinaryModal = () => {
    dispatch({type: CLOSE_MODAL})
  }

  const closeDynamicModal = () => {
    history.goBack();
  }

  const modalSwitch = () => {
    switch(modalType) {
      case 'order-details': {
        return (<Modal onClose={closeOrdinaryModal} size={ModalSize.default}><OrderDetails /></Modal>)
      }
      case 'confirmation': {
        return (<Modal onClose={closeOrdinaryModal} size={ModalSize.small}><Confirmation /></Modal>)
      }
      case 'request': {
        return (<Modal onClose={closeOrdinaryModal} size={ModalSize.small}><RequestStatus /></Modal>)
      }
      default: 
        return (<span>Произошла ошибка</span>)
    }
  }

  useEffect(() => {
    dispatch(getIngredients())
    dispatch(getUserRequest());
  }, [])

  if (ingredientsRequest || tokenAuthorization) {
    return (<LoadingRocket />)
  }

  return (
    <>
      <AppHeader />
        <main className={`${styles.main} pr-5 pl-5`}>
          <Switch location={background || location}>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
            <Route path="/feed/:id" exact>
              <FullOrder />
            </Route>
            <ProtectedRoute path="/profile/orders/:id" exact>
              <FullOrder />
            </ProtectedRoute>
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
      
      {background &&
        <Switch>
          <Route path='/feed/:id' exact>
            <Modal onClose={closeDynamicModal}>
              <Order />
            </Modal>
          </Route>
          <Route path='/profile/orders/:id' exact>
            <Modal onClose={closeDynamicModal}>
              <Order />
            </Modal>
          </Route>
          <Route path='/ingredients/:id' exact>
            <Modal onClose={closeDynamicModal}>
              <IngredientDetails />
            </Modal>
          </Route>
        </Switch>
      }

      {isModalOpened && modalSwitch()}
    </>
  )
}

export default App;
