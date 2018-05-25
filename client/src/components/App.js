import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import DefaultPage from './DefaultPage';
import RegistrationForm from './RegistrationForm';
import PrivateRoute from './PrivateRoute';
import Error404 from './Error404';
import Unauthorized from './Unauthorized';
import Client from './Client';
import ClientCreate from './ClientCreate';
import ClientList from './ClientList';
import ClientDelete from './ClientDelete';
import ClientUpdate from './ClientUpdate';

class App extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			isLoggedIn: true
		}
		this.authHandler();

		this.authHandler = this.authHandler.bind(this)
	}

	authHandler(){
		let self = this;
		fetch('/auth/', {
			credentials: 'include',
		})
		.then(res => res.json())
		.catch(err => console.error('Request Failure:', err))
		.then(function(res) {
			self.setState({
				isLoggedIn: res.isAuth
			});
		});
	}

	render() {
		// TODO Make 404 page work with ?nested? Routes, or find good solution to be able to render DefaultPage AND Client together
		if (!this.state.isLoggedIn){
			return (
				<Router>
					<Switch>
						<Route exact path='/login' render={(props) => <LoginPage {...props} handler={this.authHandler} />} />
						<Redirect to='/login'/>
					</Switch>
				</Router>
			);
		} else {

			//I think I need to start to organize the components folder
			// here at the top level we will only route to main urls (/client, /admin, etc)
			// within the /client component, we will route for /list, /create, etc
			return (
				<Router>
					<Switch>
						<Route path='/' component={DefaultPage} />
						<PrivateRoute auth={this.state.isLoggedIn} path='/register' redirect={'/unauthorized'} component={RegistrationForm} />
						<PrivateRoute auth={this.state.isLoggedIn} path='/client' redirect={'/unauthorized'} component={Client} />
						<Route path='/client/list' component={ClientList} />
						<Route path='/client/create' component={ClientCreate} />
						<Route path='/client/delete' component={ClientDelete} />
						<Route path='/client/update' component={ClientUpdate} />
						<Route exact path='/unauthorized' component={Unauthorized} />
						<Route path='*' component={Error404} />
					</Switch>
				</Router>
			);
		}
	}
}


export default App;
