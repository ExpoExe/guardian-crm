import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Error404 from './Defaults/Error404';
import Client from './Client/Client';
import Staff from './Staff/Staff';

export default class AuthedApp extends React.Component {

	constructor(props){
		super(props);
		console.log(this.props);

		this.state = {
			staff: this.props.staff
		}

	}

	componentDidMount(){
		this.setState({
			staff: this.props.staff
		});
	}

	render() {
		// here at the top level we will only route to main urls (/client, /admin, etc)
		// e.g. within the /client component, we will route for /list, /create, etc
		// each level of Switch'd Routes need their own 404 Route
		return (
			<div>
				<Header staff={this.props.staff} />
				<Switch>
					<Route staff={this.props.staff} path='/staff' component={Staff} />
					<Route path='/client' component={Client} />
					<Route path='*' component={Error404} />
				</Switch>
				<Footer />
			</div>
		);
	}
	
}
