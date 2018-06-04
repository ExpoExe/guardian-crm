import React from 'react';
import { Container } from 'reactstrap';

export default class AdminDefault extends React.Component {

	render() {
		return (
			<div style={{maxWidth: '1000px', margin: '2% auto', textAlign: 'center'}}>
				<Container fluid>
					<h4>I should put something nice here.</h4>
				</Container>
			</div>
		);
	}
}