import React from 'react';
import { Container } from 'reactstrap'; 
import { Route, Switch, Link } from 'react-router-dom';
import Error404 from '../Defaults/Error404';
import RegistrationForm from './RegistrationForm';
import AdminDefault from './AdminDefault';
import ViewAll from './ViewAll';

export default class Admin extends React.Component{
	render() {
		return (
			<Container fluid style={{maxWidth:'1200px', margin: '2% auto'}}>
			<p>Admin Page</p>
			<p><Link to='/admin/viewall'>View All Staff</Link> | <Link to='/admin/register'>Register New Staff</Link> | Other | Settings</p>
			<Switch>
				<Route exact path='/admin' component={AdminDefault} />
				<Route path='/admin/register' component={RegistrationForm} />
				<Route path='/admin/viewall' component={ViewAll} />
				<Route path='*' component={Error404} />
			</Switch>
			</Container>
		);
	}
}