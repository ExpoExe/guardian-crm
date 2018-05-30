import React from 'react';
import { Container } from 'reactstrap';
import LoginForm from './LoginForm';

export default class LoginPage extends React.Component {

	render() {
		if (this.props.referrer){
			return (
				<div style={{maxWidth: '1000px', margin: '2% auto'}}>
					<Container fluid>
						<h1>Welcome to the CRM</h1>
						<LoginForm formHandler={this.props.handler} />
						<h3>Sorry, you must be logged in to access {this.props.referrer}</h3>
					</Container>
				</div>
			);
		} else {
			return (
				<div style={{maxWidth: '1000px', margin: '2% auto'}}>
					<Container fluid>
						<h1>Welcome to the CRM</h1>
						<LoginForm formHandler={this.props.handler} />
					</Container>
				</div>
			);
		}

	}
}