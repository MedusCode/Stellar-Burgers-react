import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook} from 'react-redux';
import { AppDispatch, AppThunk } from '../../types/appThunk';
import RootState from '../../types/rootState';

const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

export { useSelector, useDispatch }