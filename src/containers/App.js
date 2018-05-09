import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from '../store/index';
import { Provider } from 'react-redux';
import AppContainer from '../containers/AppContainer';

class App extends Component {
	static propTypes = {

	};

	render() {
		return (
			<Provider store={store}>
				<AppContainer>

				</AppContainer>
			</Provider>
		);
	}
}

export default App;