import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Loading from './Helpers/Loading';
import LoginPage from './Login/LoginPage';
import AuthedApp from './AuthedApp';

class App extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			isLoggedIn: null,
			staff: null
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
				isLoggedIn: res.isAuth,
				staff: res.staff
			});
		});
	}

	render() {
		if (this.state.isLoggedIn === null){
			return ( <Loading /> );
		} else if (!this.state.isLoggedIn){
			return (
				<Router>
					<Switch>
						<Route exact path='/login' render={(props) => <LoginPage {...props} handler={this.authHandler} />} />
						<Redirect to='/login'/>
					</Switch>
				</Router>
			);
		} else {
			return (
				<Router>
					<AuthedApp staff={this.state.staff} />
				</Router>
			);
		}
	}
}


export default App;
