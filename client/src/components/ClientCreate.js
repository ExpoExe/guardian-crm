import React from 'react';
import { 
	Col, 
	Button, 
	Form, 
	FormGroup, 
	Label, 
	Input
} from 'reactstrap';

export default class ClientCreate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			createFirstName: '',
			createLastName: '',
			createClientAddr: '',
			createClaimAddr: '',
			createCity: '',
			createZip: '',
			createEmail: '',
			createEmailConfirm: '',
			createPhone: '',
			createPriority: '!',
			addedClient: false
		};

		this.updateInput = this.updateInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleAddNew = this.handleAddNew.bind(this);

	}

	validateForm() {
		if (this.state.createPhone.length > 0 
			&& this.state.createLastName.length > 0
			&& this.state.createEmail === this.state.createEmailConfirm){
				return true;
			} else {
				return false;
			}
	}

	updateInput (e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	handleSubmit (e) {
		e.preventDefault();
		
		fetch('/client/create', {
			method: 'POST',
			body: JSON.stringify(this.state), // data can be `string` or {object}!
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then(res => res.json())
			.catch(error => console.error('Error:', error))
			.then(response => console.log('Success:', response));

		this.setState({
			createFirstName: '',
			createLastName: '',
			createClientAddr: '',
			createClaimAddr: '',
			createCity: '',
			createZip: '',
			createEmail: '',
			createEmailConfirm: '',
			createPhone: '',
			createPriority: '!',
			addedClient: true
		});

	}

	handleAddNew (e) {
		e.preventDefault();
		this.setState({
			addedClient:false
		});
	}

	render() {
		if (this.state.addedClient){
			return (
				<div style={{maxWidth:'1200px', fontSize: '80%', margin:'2% auto'}}>
					<h4>Added Client</h4>
					<FormGroup row>
						<Col sm={12}>
							<Button onClick={this.handleAddNew} block>Add another</Button>
						</Col>
					</FormGroup>
				</div>
			);

		} else {
			return (
				<div style={{maxWidth:'1200px', fontSize: '80%', margin:'2% auto'}}>
					<Form onSubmit={this.handleSubmit}>
						<FormGroup row>
							<Label for="createFirstName" sm={4}>First Name</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.createFirstName} type="text" name="createFirstName" id="createFirstName" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="createLastName" sm={4}>Last Name</Label>
							<Col sm={8}>
								<Input required onChange={this.updateInput} value={this.state.createLastName} type="text" name="createLastName" id="createLastName"  />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="createClientAddr" sm={4}>Client Full Address</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.createClientAddr} type="text" name="createClientAddr" id="createClientAddr"  />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="createClaimAddr" sm={4}>Claim Street Address</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.createClaimAddr} type="text" name="createClaimAddr" id="createClaimAddr"  />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="createCity" sm={4}>Claim City</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.createCity} type="text" name="createCity" id="createCity"  />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="createZip" sm={4}>Claim Zipcode</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.createZip} type="text" name="createZip" id="createZip"  />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="createPhone" sm={4}>Phone Number</Label>
							<Col sm={8}>
								<Input required onChange={this.updateInput} value={this.state.createPhone} type="number" name="createPhone" id="createPhone"  />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="createEmail" sm={4}>Email</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.createEmail} type="email" name="createEmail" id="createEmail"  />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="createEmailConfirm" sm={4}>Confirm Email</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.createEmailConfirm} type="email" name="createEmailConfirm" id="createEmailConfirm"  />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="updatePriority" sm={4}>Priority</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.updatePriority} type="select" name="updatePriority" id="updatePriority">
									<option value='!'>Low</option>
									<option value='!!'>Medium</option>
									<option value='!!!'>High</option>
								</Input>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col sm={12}>
								<Button disabled={!this.validateForm()} block>Submit</Button>
							</Col>
						</FormGroup>
					</Form>
				</div>
			);
		}
	}
}