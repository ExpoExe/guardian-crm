import React from 'react'; // eslint-disable-line no-unused-vars
import { Redirect } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import { 
	Container, 
	Col, 
	Button, 
	Form, 
	FormGroup, 
	Label, 
	Input, 
	FormText 
} from 'reactstrap';

export default class ClientUpdate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			updateFirstName: '',
			updateLastName: '',
			updateClientAddr: '',
			updateClaimAddr: '',
			updateCity: '',
			updateZip: '',
			updateEmail: '',
			updateEmailConfirm: '',
			updatePhone: '',
			updatePriority: '!',
			updateID: '',
			updatedClient: false
		};

		this.updateInput = this.updateInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpdateClient = this.handleUpdateClient.bind(this);

	}

	validateForm() {
		return this.state.updateID.length > 0;
	}

	updateInput (e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	handleSubmit (e) {
		e.preventDefault();
		
		fetch('/client/update', {
			method: 'POST',
			body: JSON.stringify(this.state), // data can be `string` or {object}!
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then(res => res.json())
			.catch(error => console.error('Error:', error))
			.then(response => console.log('Success:', response));

		this.setState({
			updateFirstName: '',
			updateLastName: '',
			updateClientAddr: '',
			updateClaimAddr: '',
			updateCity: '',
			updateZip: '',
			updateEmail: '',
			updateEmailConfirm: '',
			updatePhone: '',
			updatePriority: '!',
			updateID: '',
			updatedClient: true
		});

	}

	handleUpdateClient (e) {
		e.preventDefault();
		this.setState({
			updatedClient:false
		});
	}

	render() {
		if (this.state.updatedClient){
			return (
				<div style={{maxWidth:'1200px', fontSize: '80%', margin:'2% auto'}}>
					<h4>Updated Client</h4>
					<FormGroup row>
						<Col sm={12}>
							<Button onClick={this.handleUpdateClient} block>Update another</Button>
						</Col>
					</FormGroup>
				</div>
			);

		} else {
			return (
				<div style={{maxWidth:'1200px', fontSize: '80%', margin:'2% auto'}}>
					<Form onSubmit={this.handleSubmit}>
						<FormGroup row>
							<Label for="updateFirstName" sm={4}>First Name</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.updateFirstName} type="text" name="updateFirstName" id="updateFirstName" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="updateLastName" sm={4}>Last Name</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.updateLastName} type="text" name="updateLastName" id="updateLastName"  />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="updateClientAddr" sm={4}>Client Full Address</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.updateClientAddr} type="text" name="updateClientAddr" id="updateClientAddr"  />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="updateClaimAddr" sm={4}>Claim Street Address</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.updateClaimAddr} type="text" name="updateClaimAddr" id="updateClaimAddr"  />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="updateCity" sm={4}>Claim City</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.updateCity} type="text" name="updateCity" id="updateCity"  />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="updateZip" sm={4}>Claim Zipcode</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.updateZip} type="text" name="updateZip" id="updateZip"  />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="updatePhone" sm={4}>Phone Number</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.updatePhone} type="number" name="updatePhone" id="updatePhone"  />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="updateEmail" sm={4}>Email</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.updateEmail} type="email" name="updateEmail" id="updateEmail"  />
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
							<Label for="updateID" sm={4}>ID</Label>
							<Col sm={8}>
								<Input required onChange={this.updateInput} value={this.state._id} type="text" name="updateID" id="updateID"  />
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