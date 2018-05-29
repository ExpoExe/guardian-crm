import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './Login/LoginPage';
import DefaultPage from './Defaults/DefaultPage';
import RegistrationForm from './RegistrationForm';
import PrivateRoute from './Helpers/PrivateRoute';
import Error404 from './Defaults/Error404';
import Unauthorized from './Defaults/Unauthorized';
import Client from './Client/Client';

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

			// here at the top level we will only route to main urls (/client, /admin, etc)
			// within the /client component, we will route for /list, /create, etc
			return (
				<Router>
					<Switch>
						<Route exact path='/' component={DefaultPage} />
						<PrivateRoute auth={this.state.isLoggedIn} path='/register' redirect={'/unauthorized'} component={RegistrationForm} />
						<PrivateRoute auth={this.state.isLoggedIn} path='/client' redirect={'/unauthorized'} component={Client} />
						<Route exact path='/unauthorized' component={Unauthorized} />
						<Route path='*' component={Error404} />
					</Switch>
				</Router>
			);
		}
	}
}


export default App;
