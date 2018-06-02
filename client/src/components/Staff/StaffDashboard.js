import React from 'react';
import Loading from '../Helpers/Loading';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

export default class StaffDashboard extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			staff: this.props.staff,
			staff_data:[],
			isLoading: true
		};
	}

	componentDidMount(){

		const self = this;
		
		fetch('/staff/dashboard/'+this.props.staff.username)
			.then(res => res.json())
			.then(function(data){
				delete data[0].password;
				self.setState({
					staff_data: data[0], 
					isLoading: false
				});
			});
	}

	render() {
		if (this.state.isLoading === true){
			return (<Loading />);
		} else {
			return(
				<div style={{maxWidth:'1200px', margin:'2% auto'}}>
					<h2>Welcome {this.state.staff_data.firstName} {this.state.staff_data.lastName}</h2>
					<Link to='/staff/changepass'>Change Password</Link> <br/>
					{
					this.state.staff_data.employeeType === 'admin' && 
					<Link to='/staff/register'>Register New Staff</Link>
					}
					<h3>Assigned Claims:</h3>
					<Table responsive hover striped>
						<thead>
							<tr>
								<th>ID</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>City</th>
								<th>Phone</th>
								<th>Email</th>
								<th>Priority</th>
							</tr>
						</thead>
						<tbody>
							{this.state.staff_data.assignedClaims.map(claim => 
								<tr key={claim.id}>
									<td>{claim.id}</td>
									<td>{claim.firstName}</td>
									<td>{claim.lastName}</td>
									<td>{claim.city}</td>
									<td>{claim.phone}</td>
									<td>{claim.email}</td>
									<td>{claim.priority}</td>
								</tr>
							)}
						</tbody>
					</Table>
				</div>
			);
		}
	}

}