import { ThunkAction } from 'redux-thunk';
import { ActionCreator } from 'redux';
import { store } from '../services/store';
import { TModalActions } from '../services/actions/modal';
import { TAllOrdersWsActions } from '../services/actions/all-orders-web-socket';
import { TUserOrdersWsActions } from '../services/actions/user-orders-web-socket';
import { TIngredientsActions } from '../services/actions/ingredients';
import { TBurgerConstructorActions } from '../services/actions/burger-constructor';
import { TDraggingActions } from '../services/actions/dragging';
import { TUserActions } from '../services/actions/user';
import RootState from './rootState';

export type TApplicationActions = 
  TModalActions 
  | TAllOrdersWsActions 
  | TUserOrdersWsActions 
  | TIngredientsActions 
  | TBurgerConstructorActions
  | TDraggingActions
  | TUserActions

type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, RootState, unknown, TApplicationActions>>;
type AppDispatch = typeof store.dispatch;

export type { AppThunk, AppDispatch }