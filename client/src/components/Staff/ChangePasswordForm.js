import React from 'react'; 
import { Container, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import CustomAlertBox from '../Alerts/CustomAlertBox';
import Countdown from '../Helpers/Countdown';

export default class ChangePasswordForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentPassword: '',
			newPassword: '',
			confirmNewPassword: '',
			errors: {
				currentPassword: null,
				newPassword: null,
				confirmNewPassword: null,
			},
			badPasswordErr: false,
			updatedPassword: false,
			loggedIn: true
		};

		this.updateInput = this.updateInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.logStaffOut = this.logStaffOut.bind(this);

	}

	updateInput (e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	logStaffOut () {

	}

	handleSubmit (e) {
		e.preventDefault();
		const self = this;

		this.setState({
			errors: {
				currentPassword: null,
				newPassword: null,
				confirmNewPassword: null,
			},
			badPasswordErr: null,
		});

		fetch('/staff/changepass', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(this.state), // data can be `string` or {object}!
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then(res => res.json())
			.catch(err => console.error('Request Failure:', err))
			.then(function(res) {
				if (res.ok){
					self.setState({
						currentPassword: '',
						newPassword: '',
						confirmNewPassword: '',
						updatedPassword: true
					});
					
				} else {
					if (res.badPassword){ self.setState({ badPasswordErr: true }); }
					self.setState({
						errors: {
							currentPassword: res.currentPassword,
							newPassword: res.newPassword,
							confirmNewPassword: res.confirmNewPassword,
						}
					});
					if (self.state.errors.newPassword != null){self.setState({newPassword: '', 'confirmNewPassword': ''});}
				}
			});
	}

	render() {
		// TODO make it clear user will be logged out after successful update
		return (
			<div>
			<h2>Change Password</h2>
				<Container fluid>
					<Form onSubmit={this.handleSubmit}>
						<FormGroup row>
							<Label for="currentPassword" sm={2}>Current Password</Label>
							<Col sm={10}>
								<Input required onChange={this.updateInput} value={this.state.currentPassword} type="password" name="currentPassword" id="currentPassword" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="newPassword" sm={2}>New Password</Label>
							<Col sm={10}>
								<Input required onChange={this.updateInput} value={this.state.newPassword} type="password" name="newPassword" id="newPassword" />
							</Col>
						</FormGroup>
						<CustomAlertBox type='warning' message={this.state.errors.newPassword} active={(this.state.errors.newPassword != null)} />
						<FormGroup row>
							<Label for="confirmNewPassword" sm={2}>Confirm New Password</Label>
							<Col sm={10}>
								<Input required onChange={this.updateInput} value={this.state.confirmPassword} type="password" name="confirmNewPassword" id="confirmNewPassword"  />
							</Col>
						</FormGroup>
						<CustomAlertBox type='warning' message={this.state.errors.confirmNewPassword} active={(this.state.errors.confirmNewPassword != null)} />
						<FormGroup row>
							<Col sm={12}>
								<Button color='info' block>Change Password</Button>
							</Col>
						</FormGroup>
					</Form>		
					<CustomAlertBox type='danger' message='Wrong current password' active={this.state.badPasswordErr} />
					<CustomAlertBox type='success' message='Successfully changed password!' active={this.state.updatedPassword} />
					{
						this.state.updatedPassword && <p>You will be logged out in: <Countdown timer={5} /> </p>
					}
				</Container>
			</div>
		);
	}
}