import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import MatchLobby from './MatchLobby';


const Main = () => (
	<main className='mainApp'>
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/login' component={LoginForm} />
      <Route exact path='/signup' component={SignUpForm} />
      <Route exact path='/lobby' component={MatchLobby} />
		</Switch>
	</main>
)

export default Main;
