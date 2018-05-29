import React from 'react';
import { Container } from 'reactstrap'; 
import { Route } from 'react-router-dom';
import ClientNavBar from './ClientNavBar';
import ClientCreate from './ClientCreate';
import ClientList from './ClientList';
import ClientDelete from './ClientDelete';
import ClientUpdate from './ClientUpdate';

export default class Client extends React.Component{
	render() {
		return (
			<Container fluid style={{maxWidth:'1200px', margin: '2% auto'}}>
				<ClientNavBar />
				<Route path='/client/list' component={ClientList} />
				<Route path='/client/create' component={ClientCreate} />
				<Route path='/client/delete' component={ClientDelete} />
				<Route path='/client/update' component={ClientUpdate} />
			</Container>
		);
	}
}