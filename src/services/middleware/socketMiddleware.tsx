import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch } from '../../types/appThunk';
import RootState from '../../types/rootState';
import { IWsActions } from '../store';

export const socketMiddleware = (wsUrl: string, wsActions: IWsActions, isTokenNeeded: boolean): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsClose } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(isTokenNeeded ? `${wsUrl}?token=${localStorage.getItem('accessToken')}` : wsUrl);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          dispatch({ type: onMessage, payload: JSON.parse(event.data) });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsClose) {
          socket.close(1000, 'CLOSE_NORMAL')
        }
      }

      next(action);
    };
  };
}; 