import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { setRoute } from '../AC/route';
import '../styles.css';

class AppContainer extends Component {
	render() {
		let pageContent = [
			<Header key="header" />,
			<div key="main-content" className="main-content">
				{this.props.children}
			</div>,
			<Footer key="footer" />,
		];

		return pageContent;
	}
}

export default AppContainer;