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

export default class ClientCreate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			createFirstName: '',
			createLastName: '',
			createPopularity: 0,
			createAge: 0,
			addedClient: false
		};

		this.updateInput = this.updateInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleAddNew = this.handleAddNew.bind(this);

	}

	validateForm() {
		return this.state.createFirstName.length > 0 && this.state.createLastName.length > 0;
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
			createPopularity: 0,
			createAge: 0,
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
								<Input required onChange={this.updateInput} value={this.state.createFirstName} type="text" name="createFirstName" id="createFirstName" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="createLastName" sm={4}>Last Name</Label>
							<Col sm={8}>
								<Input required onChange={this.updateInput} value={this.state.createLastName} type="text" name="createLastName" id="createLastName"  />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="createPopularity" sm={4}>Popularity</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.createPopularity} type="number" name="createPopularity" id="createPopularity"  />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="createAge" sm={4}>Age</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.createAge} type="number" name="createAge" id="createAge"  />
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