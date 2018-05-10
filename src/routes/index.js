import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../containers/App';
import Home from '../containers/Home';
import Admin from '../containers/Admin';
import Conferences from '../containers/Conferenceces';
import NotFound from '../containers/NotFound';

export default (
	<BrowserRouter>
		<App>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/admin" component={Admin} />
				<Route path="/conferences-list" component={Conferences} />
				<Route component={NotFound} />
			</Switch>
		</App>
	</BrowserRouter>
);