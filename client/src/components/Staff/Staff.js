import React from 'react';
import { Container } from 'reactstrap'; 
import { Route, Switch } from 'react-router-dom';
import Error404 from '../Defaults/Error404';
import StaffDashboard from './StaffDashboard';
import Admin from '../Admin/Admin';
import ChangePasswordForm from './ChangePasswordForm';

export default class Staff extends React.Component{

	render() {
		return (
			<div>
				<p>Staff Page</p>
				<Switch>
					<Route path={'/staff/'+this.props.staff.username} render={(props) => <StaffDashboard {...props} staff={this.props.staff} />} />
					<Route path='/staff/changepass' component={ChangePasswordForm} />
					<Route path='*' component={Error404} />
				</Switch>
			</div>

		);
	}
}