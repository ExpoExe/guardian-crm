import React from 'react';
import Loading from '../Helpers/Loading';
import { Table, Container } from 'reactstrap';

export default class ViewAll extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			staff:[],
			isLoading: true
		};
	}

	componentDidMount(){
		fetch('/staff/list')
			.then(res => res.json())
			.then(staff => this.setState({
				staff: staff, 
				isLoading: false
			}));
	}

	render() {
		return (
			<Container fluid>
				{this.state.isLoading === true
					?  <Loading />
					:  <Table responsive hover striped>
						<thead>
							<tr>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Username</th>
								<th>Email</th>
								<th>Employee Type</th>
								<th>ID</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{this.state.staff.map(staff => 
								<tr key={staff._id}>
									<td>{staff.firstName}</td>
									<td>{staff.lastName}</td>
									<td>{staff.username}</td>
									<td>{staff.email}</td>
									<td>{staff.employeeType}</td>
									<td>{staff._id}</td>
									<td>Edit</td>
								</tr>
							)}
						</tbody>
					</Table>}

			</Container>
		);
	}

}