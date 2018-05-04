import React from 'react'; // eslint-disable-line no-unused-vars
import Login from './Login';
import Client from './Client';
import { BrowserRouter as Router, Route } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import ClientCreate from './ClientCreate'; // eslint-disable-line no-unused-vars
import ClientList from './ClientList'; // eslint-disable-line no-unused-vars
import ClientDelete from './ClientDelete'; // eslint-disable-line no-unused-vars
import ClientUpdate from './ClientUpdate'; // eslint-disable-line no-unused-vars

class App extends React.Component {

	render() {
		return (
			<Router>
				<div>
					<Route exact path='/' component={Login} />
					<Route path='/client' component={Client} />
					<Route path='/client/list' component={ClientList} />
					<Route path='/client/create' component={ClientCreate} />
					<Route path='/client/delete' component={ClientDelete} />
					<Route path='/client/update' component={ClientUpdate} />
				</div>
			</Router>
		);
	}
}

export default App;
