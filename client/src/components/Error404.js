import React from 'react';
import { Container } from 'reactstrap';

export default class Error404 extends React.Component {

	render() {
		if (this.props.location.pathname == '/login'){
			return (
				<div style={{maxWidth: '1000px', margin: '2% auto', textAlign: 'center'}}>
					<Container fluid>
						<h1>Error 404: Page not found</h1>
						<h3>Sorry, you're already logged in!</h3>
					</Container>
				</div>
			);
		} else {
			return (
				<div style={{maxWidth: '1000px', margin: '2% auto', textAlign: 'center'}}>
					<Container fluid>
						<h1>Error 404: Page not found</h1>
						<h3>Sorry, unable to find <code>{this.props.location.pathname}</code></h3>
					</Container>
				</div>
			);
		}

	}
}