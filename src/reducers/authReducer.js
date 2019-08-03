import { 
  LOGIN,
  LOGOUT,
  SIGN_UP,
} from '../actions/types';


const initialState = {
  loggedIn: false,
  token: '',
  accountCreated: false,
  user: {},
}

export default function(state = initialState, action) {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        token: action.payload.token,
        user: action.payload.user,
      }
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        token: '',
        user: {},
      }
    case SIGN_UP:
      return {
        ...state,
        accountCreated: true,
        token: action.payload.token,
        user: action.payload.user,
      }
    default:
      return state;
  }
}
