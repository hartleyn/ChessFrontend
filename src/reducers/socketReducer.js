import { 
  CONNECT_SOCKET, 
  RECEIVE_SOCKET_MESSAGE,
} from '../actions/types';


const initialState = {
  socketMessage: {},
  socketConnected: false,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case CONNECT_SOCKET:
      return {
        ...state,
        matchSocket: action.payload,
        socketConnected: true,
      }
    case RECEIVE_SOCKET_MESSAGE:
      return {
        ...state,
        socketMessage: action.payload,
      }
    default:
      return state;
  }
}
