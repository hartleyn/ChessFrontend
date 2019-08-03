import {
  JOIN_MATCH,
  FETCH_MATCHES,
  FETCH_PIECES, 
  LIFT_PIECE,
  END_TURN,
} from '../actions/types';


const initialState = {
  matchId: 19,
  matchJoined: false,
  team: 'W',
  matches: [],
  pieces: [],
  piecesUpdated: false,
  liftedPiece: {},
  liftedPieceSquare: {},
  holdingPiece: false,
  droppingPiece: false,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case JOIN_MATCH:
      return {
        ...state,
        matchId: action.payload,
        matchJoined: true,
      }
    case FETCH_MATCHES:
      return {
        ...state,
        matches: action.payload,
      }
    case FETCH_PIECES:
      return {
        ...state,
        pieces: action.payload,
        piecesUpdated: true,
      }
    case LIFT_PIECE:
      return {
        ...state,
        liftedPiece: action.payload,
        liftedPieceSquare: action.sqaure,
        holdingPiece: true,
        piecesUpdated: false,
      }
    case END_TURN:
      return {
        ...state,
        piecesUpdated: false,
        team: (state.team === 'B') ? 'W' : 'B',
      }
    default:
      return state;
  }
}
