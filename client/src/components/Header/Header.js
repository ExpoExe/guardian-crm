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

export default class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
			loggedIn: true
		};
		
		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.handleLogout = this.handleLogout.bind(this);

	}

	handleLogout (e) {
		e.preventDefault();

		let self = this;
		fetch('/staff/logout', {
			method: 'POST',
			body: JSON.stringify(this.state), // data can be `string` or {object}!
			credentials: 'include',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then(res => res.json())
			.catch(err => console.error('Request Failure:', err))
			.then(function(res) {
				self.setState({
					loggedIn: false
				});
			});
	}

	toggleNavbar() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		if (!this.state.loggedIn){
			window.location.reload();
			return <div></div>
		} else {
			return (
				<Navbar color='light' light expand='md'>
				<NavbarBrand tag={Link} to={'/staff/'+this.props.staff.username}>Gaurdian PAMS</NavbarBrand>
				<NavbarToggler onClick={this.toggleNavbar} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className='ml-auto' navbar>
						<NavItem>
							<NavLink tag={Link} to={'/staff/'+this.props.staff.username}>Your Dashboard</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={Link} to='/client'>Clients</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={Link} to='/claims'>Claims</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={Link} to='/companies'>Companies</NavLink>
						</NavItem>
						{
							this.props.staff.employeeType === 'admin' && 
							<NavItem>
								<NavLink tag={Link} to='/admin'>Admin</NavLink>
							</NavItem>
						}
						<NavItem>
							<NavLink onClick={this.handleLogout}>Logout</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
			);
		}
	}
	
}