import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import CustomAlertBox from './CustomAlertBox';

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			errors: {
				username: null,
				password: null
			},
			notFoundErr: false,
			badPasswordErr: false,
			loggedIn: false
		};

		this.updateInput = this.updateInput.bind(this);
		this.handleLogin = this.handleLogin.bind(this);

	}

	updateInput (e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	handleLogin(e){

		e.preventDefault();
		const self = this;

		this.setState({
			errors: {
				username: null,
				password: null,
			},
		});

		fetch('/staff/login', {
			method: 'POST',
			body: JSON.stringify(this.state), // data can be `string` or {object}!
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then(res => res.json())
			.catch(err => console.error('Request Failure:', err))
			.then(function(res) {
				if (res.ok){
					self.setState({
						username: '',
						password: '',
						loggedIn: true
					});
				} else {
					if (res.notFound){ self.setState({ notFoundErr: true }); }
					if (res.badPassword){ self.setState({ badPasswordErr: true }); }
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
							<CustomAlertBox type='warning' message={this.state.errors.username} active={(this.state.errors.username != null)} />
							<FormGroup row>
								<Label for="password" sm={2}>Password</Label>
								<Col sm={10}>
									<Input onChange={this.updateInput} value={this.state.password} type="password" name="password" id="password" />
								</Col>
							</FormGroup>
							<CustomAlertBox type='warning' message={this.state.errors.password} active={(this.state.errors.password != null)} />
							<FormGroup row>
								<Col sm={12}>
									<Button color='info' block>Login</Button>
								</Col>
							</FormGroup>
						</Form>
						<CustomAlertBox type='danger' message='Account with that username not found' active={this.state.notFoundErr} />
						<CustomAlertBox type='danger' message='Wrong password' active={this.state.badPasswordErr} />
					</Container>
				</div>
			);
		}
	}
}