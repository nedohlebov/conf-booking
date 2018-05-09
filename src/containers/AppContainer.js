import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles.scss';

class AppContainer extends Component {
	static propTypes = {

	};

	render() {
		let pageContent = null;

		return pageContent;
	}
}

export default withRouter(connect(
	(state) => {
		return {

		};
	}, {

	}
)(AppContainer));