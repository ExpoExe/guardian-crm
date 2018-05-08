import React from 'react';
import { Container } from 'reactstrap'; 
import ClientNavBar from './ClientNavBar';

export default class Client extends React.Component{
	render() {
		return (
			<Container fluid style={{maxWidth:'1200px', margin: '2% auto'}}>
				<ClientNavBar />
			</Container>
		);
	}
}