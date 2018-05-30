import React from 'react';

export default class Footer extends React.Component {

	render() {
		return (
			<div style={{width:'100%', backgroundColor:'#999', textAlign:'right', fontSize:'65%', padding:'5px 10px 5px 0'}}>
				{(new Date()).getFullYear()} © Justin Richard
			</div>
		);
	}
	
}