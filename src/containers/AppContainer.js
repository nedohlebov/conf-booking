import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles.css';

class AppContainer extends Component {
	render() {
		let pageContent = [
			<Header key="header" appRouteName={this.props.location.pathname} />,
			<div key="main-content" className="main-content">
				{this.props.children}
			</div>,
			<Footer key="footer" />,
		];

		return pageContent;
	}
}

export default withRouter(AppContainer);