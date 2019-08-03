import axios from 'axios';
import {
  FETCH_MATCHES,
  FETCH_PIECES, 
  LIFT_PIECE,
  END_TURN,
  JOIN_MATCH,
  CREATE_MATCH,
} from './types';
import { HOST } from '../config/config';


export const fetchMatches = () => dispatch => {
  axios.get(`${HOST}/chess/matches/`)
    .then(res => {
      console.log(res);
      dispatch({
        type: FETCH_MATCHES,
        payload: res.data,
      });
    })
    .catch(error => console.error(error));
}

export const createMatch = (token) => dispatch => {
  axios({
    url: 'chess/matches/new/',
    baseURL: `${HOST}/`,
    method: 'post',
    headers: {'Authorization': `Token ${token}`},
  })
  .then(res => {
    console.log(res);
    dispatch({
      type: CREATE_MATCH,
      payload: res.data.id,
    })
  })
  .catch(error => console.error(error));
}

export const joinMatch = (matchId, token) => dispatch => {
  axios({
    url: `chess/matches/${matchId}/join/`,
    baseURL: `${HOST}/`,
    method: 'post',
    headers: {'Authorization': `Token ${token}`},
  })
  .then(res => {
    console.log(res);
    dispatch({
      type: JOIN_MATCH,
      payload: res.data.id
    })
  })
  .catch(error => console.error(error));
}

export const fetchPieces = (matchId) => dispatch => {
  axios.get(`${HOST}/chess/matches/${matchId}/`)
    .then(res => {
      console.log(res);
      dispatch({
        type: FETCH_PIECES,
        payload: res.data.pieces,
      });
    })
    .catch(error => console.error(error));
}

export const liftPiece = (piece) => dispatch => {
  dispatch({
    type: LIFT_PIECE,
    square: {'row': piece.row, 'column': piece.column},
    payload: piece,
  });
}

export const dropPiece = (piece, row, column, webSocket) => dispatch => {
  webSocket.send(JSON.stringify({
    'message': {
      'id': piece.id,
      'row': row,
      'column': column,
    },
  }));
}

export const endTurn = () => dispatch => {
  dispatch({
    type: END_TURN,
  });
}
