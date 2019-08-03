import axios from 'axios';
import { ApolloClient } from 'apollo-client';
import { gql } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { LOGIN, LOGOUT, SIGN_UP } from './types';
import { HOST } from '../config/config';


export const createNewAccount = (username, email, password, passwordConfirm) => dispatch => {
  axios.post(`${HOST}/rest-auth/registration/`, {
      'username': username,
      'email': email,
      'password1': password,
      'password2': passwordConfirm,
    })
    .then(res => {
      console.log(res);
      dispatch({
        type: SIGN_UP,
        payload: res.data,
      });
    })
    .catch(error => console.error(error));
}

export const loginUser = (username, password) => dispatch => {
  axios.post(`${HOST}/rest-auth/login/`, {
      'username': username,
      'password': password,
    })
    .then(res => {
      dispatch({
        type: LOGIN,
        payload: res.data,
      });
    })
    .catch(error => console.error(error));
}

export const logoutUser = (authToken) => dispatch => {
  axios({
    url: 'rest-auth/logout/',
    baseURL: `${HOST}/`,
    method: 'post',
    headers: {'Authorization': `Token ${authToken}`},
  })
  .then(res => {
    dispatch({
      type: LOGOUT,
    });
  })
  .catch(error => console.error(error));
}

export const fetchUserDetails = (authToken) => dispatch => {
  console.log(authToken);
  const httpLink = createHttpLink({
    uri: `${HOST}/chess/graphql/`,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Token ${authToken}`,
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  
  client
    .query({
      query: gql`
        {
          allUsers {
            id,
            username,
            firstName,
            lastName,
            lastLogin,
            dateJoined,
          }
        }
      `
    })
    .then(res => console.log(res))
    .catch(error => console.error(error));
}
