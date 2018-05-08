import React from 'react'; 
import { Alert } from 'reactstrap'; 

export default class CustomAlertBox extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		if (this.props.active){
			return (
				<div>
					<Alert color={this.props.type}>{this.props.message}</Alert>
				</div>
			)
		} else {
			return <span></span>
		}
	}

}