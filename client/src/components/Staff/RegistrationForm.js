import React from 'react'; 
import { Container, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import CustomAlertBox from '../Alerts/CustomAlertBox';

export default class RegistrationForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
			errors: {
				firstName: null,
				lastName: null,
				username: null,
				email: null,
				password: null,
				confirmPassword: null,
			},
			duplicateStaffErr: false,
			addedStaff: false
		};

		this.updateInput = this.updateInput.bind(this);
		this.handleRegister = this.handleRegister.bind(this);

	}

	updateInput (e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	handleRegister (e) {
		e.preventDefault();
		const self = this;

		this.setState({
			errors: {
				firstName: null,
				lastName: null,
				username: null,
				email: null,
				password: null,
				confirmPassword: null,
			},
		});

		fetch('/staff/register', {
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
						firstName: '',
						lastName: '',
						username: '',
						email: '',
						password: '',
						confirmPassword: '',
						addedStaff: true
					});

				} else {
					
					if (res.duplicated){
						self.setState({duplicateStaffErr: true});
					} else {
						self.setState({
							errors: {
								firstName: res.firstName,
								lastName: res.lastName,
								username: res.username,
								email: res.email,
								password: res.password,
								confirmPassword: res.confirmPassword,
							}
						});
						if (self.state.errors.firstName != null){self.setState({firstName: ''});}
						if (self.state.errors.lastName != null){self.setState({lastName: ''});}
						if (self.state.errors.username != null){self.setState({username: ''});}
						if (self.state.errors.email != null){self.setState({email: ''});}
						if (self.state.errors.password != null){self.setState({password: '', confirmPassword: ''});}
					}
				}
			});
	}

	render() {

		return (
			<div>
			<h2>New Staff Registration</h2>
				<Container fluid>
					<Form onSubmit={this.handleRegister}>
						<FormGroup row>
							<Label for="firstName" sm={2}>First Name</Label>
							<Col sm={10}>
								<Input required onChange={this.updateInput} value={this.state.firstName} type="text" name="firstName" id="firstName" />
							</Col>
						</FormGroup>
						<CustomAlertBox type='warning' message={this.state.errors.firstName} active={(this.state.errors.firstName != null)} />
						<FormGroup row>
							<Label for="lastName" sm={2}>Last Name</Label>
							<Col sm={10}>
								<Input required onChange={this.updateInput} value={this.state.lastName} type="text" name="lastName" id="lastName" />
							</Col>
						</FormGroup>
						<CustomAlertBox type='warning' message={this.state.errors.lastName} active={(this.state.errors.lastName != null)} />
						<FormGroup row>
							<Label for="username" sm={2}>Username</Label>
							<Col sm={10}>
								<Input required onChange={this.updateInput} value={this.state.username} type="text" name="username" id="username" />
							</Col>
						</FormGroup>
						<CustomAlertBox type='warning' message={this.state.errors.username} active={(this.state.errors.username != null)} />
						<FormGroup row>
							<Label for="email" sm={2}>Email</Label>
							<Col sm={10}>
								<Input required onChange={this.updateInput} value={this.state.email} type="email" name="email" id="email" />
							</Col>
						</FormGroup>
						<CustomAlertBox type='warning' message={this.state.errors.email} active={(this.state.errors.email != null)} />
						<FormGroup row>
							<Label for="password" sm={2}>Password</Label>
							<Col sm={10}>
								<Input required onChange={this.updateInput} value={this.state.password} type="password" name="password" id="password" />
							</Col>
						</FormGroup>
						<CustomAlertBox type='warning' message={this.state.errors.password} active={(this.state.errors.password != null)} />
						<FormGroup row>
							<Label for="confirmPassword" sm={2}>Confirm Password</Label>
							<Col sm={10}>
								<Input required onChange={this.updateInput} value={this.state.confirmPassword} type="password" name="confirmPassword" id="confirmPassword"  />
							</Col>
						</FormGroup>
						<CustomAlertBox type='warning' message={this.state.errors.confirmPassword} active={(this.state.errors.confirmPassword != null)} />
						<FormGroup row>
							<Col sm={12}>
								<Button color='info' block>Register</Button>
							</Col>
						</FormGroup>
					</Form>		
					<CustomAlertBox type='success' message='Successfully added staff user!' active={this.state.addedStaff} />
					<CustomAlertBox type='danger' message='Username or Email already exists!' active={this.state.duplicateStaffErr} />
				</Container>
			</div>
		);
	}
}