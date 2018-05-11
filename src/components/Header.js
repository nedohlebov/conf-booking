import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Glyphicon, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';

function getHeading(appRouteName) {
	let heading = 'Conferences Booking';

	if (appRouteName.indexOf('/admin') !== -1) {
		heading = 'Admin Panel';
	} else if(appRouteName.indexOf('/conference/:id') !== -1) {
		heading = 'Conference Timetable';
	}

	return heading;
}

class Header extends Component {
	componentDidUpdate () {
		const { appRouteName } = this.props;
		document.title = getHeading(appRouteName);
	}

	render() {
		const { appRouteName } = this.props;

		return (
			<header>
				<Navbar staticTop={true}>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to={'/'} className="cb-logo-link">
								<span className="logo">CBooking</span>
							</Link>
						</Navbar.Brand>
					</Navbar.Header>
					<Nav pullRight className="navbar-menu">
						<NavItem className="admin-panel" href="/admin"><small><Glyphicon glyph="user" /></small>{' '}Admin</NavItem>
					</Nav>
				</Navbar>
				<Grid>
					<Row>
						<Col md={12}>
							<h1 className="cb-page-title">
								{getHeading(appRouteName)}
							</h1>
						</Col>
					</Row>
				</Grid>
			</header>
		);
	}
}

export default Header;