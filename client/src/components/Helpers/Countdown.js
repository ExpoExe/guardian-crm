import React from 'react';

class Countdown extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			timer: this.props.timer
		};
	}
	componentDidMount(){
		const stopper = 0;
		this.interval = window.setInterval(() => {
			this.state.timer === stopper
				? this.setState(() => ({ timer: 0 }))
				: this.setState((prevState) => ({ timer: prevState.timer-1 }));
		}, 1000);
	}

	componentDidUpdate(prevProps, prevState){
		console.log('Component did update...');
		if (this.props.action && prevState.timer === 0){
			console.log('Should refresh now!');
			this.props.action();
		}
	}

	componentWillUnmount(){
		window.clearInterval(this.interval);
	}

	render(){
		return (
			<span> {this.state.timer} </span>
		);
	}
}

export default Countdown;