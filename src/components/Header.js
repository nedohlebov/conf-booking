import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setRoute } from '../AC/route';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Glyphicon, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';

class Header extends Component {
	static propTypes = {
		appRouteName: PropTypes.string.isRequired,
		setRoute: PropTypes.func.isRequired,
	};

	componentDidUpdate () {
		const { appRouteName } = this.props;
		document.title = appRouteName;
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
						<NavItem className="admin-panel" href="/conferences-list"><small><Glyphicon glyph="th-list" /></small>{' '}Conferences</NavItem>
						<NavItem className="admin-panel" href="/admin"><small><Glyphicon glyph="user" /></small>{' '}Admin</NavItem>
					</Nav>
				</Navbar>
				<Grid>
					<Row>
						<Col md={12}>
							<h1 className="cb-page-title">
								{appRouteName}
							</h1>
						</Col>
					</Row>
				</Grid>
			</header>
		);
	}
}

export default connect(
	(state) => {
		return {
			appRouteName: state.header.get('appRouteName')
		};
	}, {
		setRoute
	}
)(Header);