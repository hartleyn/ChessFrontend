import {
  CONNECT_SOCKET,
  RECEIVE_SOCKET_MESSAGE,
} from './types';


export const connectToMatchWebSocket = (matchId, authToken) => dispatch => {
  //const socketAddress = `ws://127.0.0.1:8000/ws/chess/matches/lobby/${matchId}/?${authToken}`;
  const socketAddress = `wss://api.squarechess.ga/ws/chess/matches/lobby/${matchId}/?${authToken}`;
  const matchSocket = new WebSocket(socketAddress);
  matchSocket.onopen = (event) => console.log('connected');
  matchSocket.onclose = (event) => console.log('connection closed');
  matchSocket.onerror = (event) => console.error(event);
  dispatch({
    type: CONNECT_SOCKET,
    payload: matchSocket,
  });
}

export const receiveSocketMessage = (message) => dispatch => {
  dispatch({
    type: RECEIVE_SOCKET_MESSAGE,
    payload: message,
  });
}
