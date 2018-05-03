import React from 'react'; // eslint-disable-line no-unused-vars
import Login from './Login';
import Users from './Users';
import { BrowserRouter as Router, Route } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import UsersCreate from './UsersCreate'; // eslint-disable-line no-unused-vars
import UsersList from './UsersList'; // eslint-disable-line no-unused-vars
import UsersDelete from './UsersDelete'; // eslint-disable-line no-unused-vars
import UsersUpdate from './UsersUpdate'; // eslint-disable-line no-unused-vars

class App extends React.Component {

	render() {
		return (
			<Router>
				<div>
					<Route exact path='/' component={Login} />
					<Route path='/users' component={Users} />
					<Route path='/users/list' component={UsersList} />
					<Route path='/users/create' component={UsersCreate} />
					<Route path='/users/delete' component={UsersDelete} />
					<Route path='/users/update' component={UsersUpdate} />
				</div>
			</Router>
		);
	}
}

export default App;
