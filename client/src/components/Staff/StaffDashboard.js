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
		/*
		fetch('/staff/dashboard/')
			.then(res => res.json())
			.then(clients => this.setState({
				clients: clients, 
				isLoading: false
			}));*/
	}

	render() {
		return (
			<div style={{maxWidth:'1200px', margin:'2% auto'}}>
				<h2>Dashboard</h2>
				<Link to='/staff/register'>Register New Staff</Link>
			</div>
		);
	}

}