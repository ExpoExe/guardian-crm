import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			errors: {
				usernameError: null,
				passwordError: null
			},
			loggedIn: false
		};

		this.updateInput = this.updateInput.bind(this);
		this.handleLogin = this.handleLogin.bind(this);

	}

	validateForm() {
		return this.state.username.length > 0 && this.state.password.length > 0;
	}

	updateInput (e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	handleLogin(e){

		e.preventDefault();
		const self = this;

		fetch('/staff/login', {
			method: 'POST',
			body: JSON.stringify(this.state), // data can be `string` or {object}!
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then(res => res.json())
			.catch(failure => console.error('Request Failure:', failure))
			.then(function(res) {
				if (res.ok){
					self.setState({
						username: '',
						password: '',
						errors: {
							username: null,
							password: null,
						},
						loggedIn: true
					});
				} else {
					self.setState({
						errors: {
							username: res.username,
							password: res.password,
						}
					});
					if (self.state.errors.username != null){self.setState({username: ''});}
					if (self.state.errors.password != null){self.setState({password: ''});}
				}

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
								<Label for="username" sm={2}>Username</Label>
								<Col sm={10}>
									<Input onChange={this.updateInput} value={this.state.username} type="text" name="username" id="username" />
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="password" sm={2}>Password</Label>
								<Col sm={10}>
									<Input onChange={this.updateInput} value={this.state.password} type="password" name="password" id="password"  />
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