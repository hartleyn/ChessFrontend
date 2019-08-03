// file: src/reducers/index.js
import { combineReducers } from 'redux';
import chessReducer from './chessReducer';
import socketReducer from './socketReducer';
import authReducer from './authReducer';


const appReducer = combineReducers({
  chess: chessReducer,
  socket: socketReducer,
  auth: authReducer,
})

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;
