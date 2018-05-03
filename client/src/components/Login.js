import React from 'react'; // eslint-disable-line no-unused-vars
import { Redirect } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import { Container, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'; // eslint-disable-line no-unused-vars

export default class Login extends React.Component {
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

	handleLogin (e) {
		e.preventDefault();
		this.setState({
			loggedIn: true
		});
	}

	render() {
		if(this.state.loggedIn){
			return(
				<Redirect to='/users' />
			);
		} else {
				
			return (
				<div style={{maxWidth: '600px', margin: '20% auto 0 auto'}}>
					<Container fluid>
						<h2>CRM</h2>
						<Form onSubmit={this.handleLogin}>
							<FormGroup row>
								<Label for="loginUsername" sm={2}>Username</Label>
								<Col sm={10}>
									<Input onChange={this.updateInput} value={this.state.loginUsername} type="text" name="username" id="loginUsername" />
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="loginPassword" sm={2}>Password</Label>
								<Col sm={10}>
									<Input onChange={this.updateInput} value={this.state.loginPassword} type="password" name="password" id="loginPassword"  />
								</Col>
							</FormGroup>
							<FormGroup row>
								<Col sm={12}>
									<Button disabled={!this.validateForm()} block>Login</Button>
								</Col>
							</FormGroup>
						</Form>
					</Container>
				</div>
			);
		}
	}
}