import React from 'react'; // eslint-disable-line no-unused-vars
import Loading from './Loading'; // eslint-disable-line no-unused-vars
import { Table } from 'reactstrap';

export default class ClientList extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			clients:[],
			isLoading: true
		};
	}

	componentDidMount(){
		fetch('/client/list')
			.then(res => res.json())
			.then(clients => this.setState({
				clients: clients, 
				isLoading: false
			}));
	}

	render() {
		return (
			<div style={{maxWidth:'1200px', margin:'2% auto'}}>
				{this.state.isLoading === true
					?  <Loading />
					:  <Table responsive hover striped>
						<thead>
							<tr>
								<th>First Name</th>
								<th>Last Name</th>
								<th>City</th>
								<th>Phone</th>
								<th>Email</th>
								<th>Priority</th>
								<th>ID</th>
							</tr>
						</thead>
						<tbody>
							{this.state.clients.map(client => 
								<tr key={client._id}>
									<td>{client.firstName}</td>
									<td>{client.lastName}</td>
									<td>{client.city}</td>
									<td>{client.phone}</td>
									<td>{client.email}</td>
									<td>{client.priority}</td>
									<td>{client._id}</td>
								</tr>
							)}
						</tbody>
					</Table>}

			</div>
		);
	}

}