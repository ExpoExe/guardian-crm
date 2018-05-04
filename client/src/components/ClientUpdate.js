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
			updatePopularity: 0,
			updateAge: 0,
			updateID: '',
			updatedClient: false
		};

		this.updateInput = this.updateInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpdateClient = this.handleUpdateClient.bind(this);

	}

	validateForm() {
		return this.state.updateFirstName.length > 0 && this.state.updateID.length > 0;
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
			updatePopularity: 0,
			updateAge: 0,
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
								<Input onChange={this.updateInput} value={this.state.firstName} type="text" name="updateFirstName" id="updateFirstName" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="updateLastName" sm={4}>Last Name</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.lastName} type="text" name="updateLastName" id="updateLastName"  />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="updatePopularity" sm={4}>Popularity</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.popularity} type="number" name="updatePopularity" id="updatePopularity"  />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="updateAge" sm={4}>Age</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.age} type="number" name="updateAge" id="updateAge"  />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="updateID" sm={4}>ID</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state._id} type="text" name="updateID" id="updateID"  />
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