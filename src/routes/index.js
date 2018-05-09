import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../containers/App';
import Home from '../containers/Home';
import NotFound from '../containers/NotFound';

export default (
	<BrowserRouter>
		<App>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route component={NotFound} />
			</Switch>
		</App>
	</BrowserRouter>
);