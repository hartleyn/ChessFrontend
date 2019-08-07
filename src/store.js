// file: src/store.js
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


const getAuthState = () => {
  try {
    const token = JSON.parse(localStorage.getItem('state.auth.token')) || '';
    const user = JSON.parse(localStorage.getItem('state.auth.user')) || {};
    const loggedIn = (token) ? true : false;
    return { auth: { token: token, loggedIn: loggedIn, user: user }};
  } catch(error) { 
    console.error(error);
    return undefined;
  }
}

const initialState = {...getAuthState()};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, compose(
		applyMiddleware(...middleware)/*,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/
	)
);

const setAuthState = (state) => {
  try {
    localStorage.setItem('state.auth.token', JSON.stringify((state.auth || {}).token));
    localStorage.setItem('state.auth.user', JSON.stringify((state.auth || {}).user));
  } catch(error) { 
    console.error(error);
    return undefined;
  }
}

store.subscribe(() => {
  setAuthState(store.getState());
})

export default store;
