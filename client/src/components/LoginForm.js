import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loginUsername: '',
			loginPassword: '',
			loggedIn: false
		};

		this.updateInput = this.updateInput.bind(this);
		this.handleLogin = this.handleLogin.bind(this);

	}

	validateForm() {
		return this.state.loginUsername.length > 0 && this.state.loginPassword.length > 0;
	}

	updateInput (e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	handleLogin(e){
		this.setState({
			loggedIn: true
		});
	}

	render() {
		if(this.state.loggedIn){
			return(
				<Redirect to='/client' />
			);
		} else {	
			return (
				<div>
					<Container fluid>
						<Form onSubmit={this.handleLogin}>
							<FormGroup row>
								<Label for="loginUsername" sm={2}>Username</Label>
								<Col sm={10}>
									<Input onChange={this.updateInput} value={this.state.loginUsername} type="text" name="loginUsername" id="loginUsername" />
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="loginPassword" sm={2}>Password</Label>
								<Col sm={10}>
									<Input onChange={this.updateInput} value={this.state.loginPassword} type="password" name="loginPassword" id="loginPassword"  />
								</Col>
							</FormGroup>
							<FormGroup row>
								<Col sm={12}>
									<Button color='info' disabled={!this.validateForm()} block>Login</Button>
								</Col>
							</FormGroup>
						</Form>
					</Container>
				</div>
			);
		}
	}
}