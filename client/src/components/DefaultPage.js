import React from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class DefaultPage extends React.Component {

	render() {
		return (
			<div style={{maxWidth: '1000px', margin: '2% auto', textAlign: 'center'}}>
				<Container fluid>
					<h1>Welcome to the CRM</h1>
					<h1>Thanks for logging in!</h1>
					<Link to='/register'>Register</Link> | <Link to='/client'>Client Page</Link>
				</Container>
			</div>
		);
	}
}