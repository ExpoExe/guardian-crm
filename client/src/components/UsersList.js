import React from 'react'; // eslint-disable-line no-unused-vars
import Loading from './Loading'; // eslint-disable-line no-unused-vars
import { 
	Container, 
	Col, 
	Button, 
	Table
} from 'reactstrap';

class UsersList extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			users:[],
			isLoading: true
		};
	}

	componentDidMount(){
		fetch('/users')
			.then(res => res.json())
			.then(users => this.setState({
				users: users, 
				isLoading: false
			}));
	}

	render() {
		return (
			<div style={{maxWidth:'1200px', margin:'2% auto'}}>
				{this.state.isLoading === true
					?  <Loading />
					:  <Table responsive striped>
						<thead>
							<tr>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Age</th>
								<th>Popularity</th>
								<th>ID</th>
							</tr>
						</thead>
						<tbody>
							{this.state.users.map(user => 
								<tr key={user._id}>
									<td>{user.firstName}</td>
									<td>{user.lastName}</td>
									<td>{user.age}</td>
									<td>{user.popularity}</td>
									<td>{user._id}</td>
								</tr>
							)}
						</tbody>
					</Table>}

			</div>
		);
	}

}

export default UsersList;
