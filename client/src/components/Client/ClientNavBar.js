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
import { Link } from 'react-router-dom';

export default class ClientNavBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
		};
		
		this.toggleNavbar = this.toggleNavbar.bind(this);

	}

	toggleNavbar() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
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
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}