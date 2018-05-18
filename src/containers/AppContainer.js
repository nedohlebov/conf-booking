import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles.css';
import PropTypes from 'prop-types';

class AppContainer extends Component {
	static propTypes = {
		children: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
	};

	render() {
		return [
			<Header key="header" appRouteName={this.props.location.pathname} />,
			<div key="main-content" className="main-content">
				{this.props.children}
			</div>,
			<Footer key="footer" />,
		];
	}
}

export default withRouter(AppContainer);