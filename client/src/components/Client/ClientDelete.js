import React from 'react';
import { 
	Col, 
	Button, 
	Form, 
	FormGroup, 
	Label, 
	Input
} from 'reactstrap';

export default class ClientDelete extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			deleteID: '',
			deletedClient: false
		};

		this.updateInput = this.updateInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);

	}

	validateForm() {
		return this.state.deleteID.length > 10;
	}

	updateInput (e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	handleSubmit (e) {
		e.preventDefault();
		
		fetch('/client/delete', {
			method: 'POST',
			body: JSON.stringify(this.state), // data can be `string` or {object}!
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then(res => res.json())
			.catch(error => console.error('Error:', error))
			.then(response => console.log('Success:', response));

		this.setState({
			deleteID: '',
			deletedClient: true
		});

	}

	handleDelete (e) {
		e.preventDefault();
		this.setState({
			deletedClient:false
		});
	}

	render() {
		if (this.state.deletedClient){
			return (
				<div style={{maxWidth:'1200px', fontSize: '80%', margin:'2% auto'}}>
					<h4>Deleted Client</h4>
					<FormGroup row>
						<Col sm={12}>
							<Button onClick={this.handleDelete} block>Delete another</Button>
						</Col>
					</FormGroup>
				</div>
			);

		} else {
			return (
				<div style={{maxWidth:'1200px', fontSize: '80%', margin:'2% auto'}}>
					<Form onSubmit={this.handleSubmit}>
						<FormGroup row>
							<Label for="deleteID" sm={4}>Client ID</Label>
							<Col sm={8}>
								<Input onChange={this.updateInput} value={this.state.deleteID} type="text" name="deleteID" id="deleteID" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col sm={12}>
								<Button disabled={!this.validateForm()} block>Delete</Button>
							</Col>
						</FormGroup>
					</Form>
				</div>
			);
		}
	}
}