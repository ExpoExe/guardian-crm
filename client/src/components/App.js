import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import Client from './Client';
import ClientCreate from './ClientCreate';
import ClientList from './ClientList';
import ClientDelete from './ClientDelete';
import ClientUpdate from './ClientUpdate';

class App extends React.Component {

	render() {
		return (
			<Router>
				<div>
					<Route path='/' component={LoginPage} />
					<Route path='/login' component={LoginForm} />
					<Route path='/register' component={RegistrationForm} />
					<Route path='/client' component={Client} />
					<Route path='/client/list' component={ClientList} />
					<Route path='/client/create' component={ClientCreate} />
					<Route path='/client/delete' component={ClientDelete} />
					<Route path='/client/update' component={ClientUpdate} />
				</div>
			</Router>
		);
	}
}

export default App;
