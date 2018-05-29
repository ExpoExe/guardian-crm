import React from 'react';
import { Container } from 'reactstrap';

export default class Unauthorized extends React.Component {

	render() {
		console.log(this.props);
		return (
			<div style={{maxWidth: '1000px', margin: '2% auto', textAlign: 'center'}}>
				<Container fluid>
					<h1>Error 401: Not Authorized</h1>
					<h3>Sorry, you need to be logged in to access <code>{this.props.location.pathname}</code></h3>
				</Container>
			</div>
		);
	}
}