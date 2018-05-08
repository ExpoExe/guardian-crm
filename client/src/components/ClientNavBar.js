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

export default class ClientNavBar extends React.Component {
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
			return <Redirect to='/login' />;
		} else {
			return (
				<div>
					<Navbar color="light" light expand="md">
						<NavbarBrand tag={Link} to="/client">Client Area</NavbarBrand>
						<NavbarToggler onClick={this.toggleNavbar} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavItem>
									<NavLink tag={Link} to="/client/list">Client List</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={Link} to="/client/create">Create Client</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={Link} to="/client/delete">Delete Client</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={Link} to="/client/update">Update Client</NavLink>
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