import React from 'react';
import { Container } from 'reactstrap';
import LoginForm from './LoginForm';

export default class LoginPage extends React.Component {

	render() {
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