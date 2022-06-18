import { getCookie } from "../../assets/scripts/cookie";

export const socketMiddleware = (wsUrl, wsActions, isTokenNeeded) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage, wsClose } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(isTokenNeeded ? `${wsUrl}?token=${getCookie('accessToken')}` : wsUrl);
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

        if (type === wsSendMessage) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }

        if (type === wsClose) {
          socket.close(1000, 'CLOSE_NORMAL')
        }
      }

      next(action);
    };
  };
}; 