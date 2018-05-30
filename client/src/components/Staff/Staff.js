import React from 'react';
import { Container } from 'reactstrap'; 
import { Route, Switch } from 'react-router-dom';
import Error404 from '../Defaults/Error404';
import StaffDashboard from './StaffDashboard';
import RegistrationForm from './RegistrationForm';

export default class Staff extends React.Component{
	render() {
		return (
			<Container fluid style={{maxWidth:'1200px', margin: '2% auto'}}>
				<Switch>
					<Route staff={this.props.staff} path='/staff/dashboard' component={StaffDashboard} />
					<Route path='/staff/register' component={RegistrationForm} />
					<Route path='*' component={Error404} />
				</Switch>
			</Container>
		);
	}
}