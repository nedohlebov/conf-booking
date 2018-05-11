import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../containers/App';
import Home from '../containers/Home';
import Admin from '../containers/Admin';
import Conference from '../containers/Conference';
import NotFound from '../components/NotFound';

export default (
	<BrowserRouter>
		<App>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/admin" component={Admin} />
				<Route path="/conference/:id" component={Conference} />
				<Route component={NotFound} />
			</Switch>
		</App>
	</BrowserRouter>
);