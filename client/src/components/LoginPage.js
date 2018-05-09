import React from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import { Link } from 'react-router-dom';
import { Row, Container, Col } from 'reactstrap';

export default class LoginPage extends React.Component {

	render() {
		return (
			<div style={{maxWidth: '1000px', margin: '2% auto', textAlign: 'center'}}>
				<Container fluid>
					<h1>Welcome to the CRM</h1>
					<Link to='/login'>Login</Link>| 
					<Link to='/register'>Register</Link>
				</Container>
			</div>
		);
	}
}