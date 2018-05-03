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

export default class UsersDelete extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			deleteID: '',
			deletedUser: false
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
		
		fetch('/users/delete', {
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
			deletedUser: true
		});

	}

	handleDelete (e) {
		e.preventDefault();
		this.setState({
			deletedUser:false
		});
	}

	render() {
		if (this.state.deletedUser){
			return (
				<div style={{maxWidth:'1200px', fontSize: '80%', margin:'2% auto'}}>
					<h4>Deleted User</h4>
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
							<Label for="deleteID" sm={4}>User ID</Label>
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