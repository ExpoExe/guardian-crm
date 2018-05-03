import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';
import { 
	Link,
	Redirect
} from 'react-router-dom';

export default class NavBar extends React.Component {
	constructor(props) {
		super(props);

		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.state = {
			isOpen: false,
			loggedIn: true
		};

		this.handleLogout = this.handleLogout.bind(this);

	}

	toggleNavbar() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	handleLogout (e) {
		e.preventDefault();
		this.setState({
			loggedIn: false
		});
	}

	render() {
		if (!this.state.loggedIn){
			return <Redirect to='/' />;
		} else {
			return (
				<div>
					<Navbar color="light" light expand="md">
						<NavbarBrand tag={Link} to="/users">CRM</NavbarBrand>
						<NavbarToggler onClick={this.toggleNavbar} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavItem>
									<NavLink tag={Link} to="/users/list">User List</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={Link} to="/users/create">Create User</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={Link} to="/users/delete">Delete User</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={Link} to="/users/update">Update User</NavLink>
								</NavItem>
								<NavItem>
									<NavLink onClick={this.handleLogout}>Logout</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</Navbar>
				</div>
			);
		}
	}
}