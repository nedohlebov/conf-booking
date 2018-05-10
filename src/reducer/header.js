import { Map } from 'immutable';
import { SET, ROUTE } from '../constants/index'
const defaultState = Map({
	'appRouteName': '',
});

export default (state = defaultState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET + ROUTE:
			const homeInitUrl = payload.routeName;
			let appRouteName = 'Conference Booking';

			if (homeInitUrl.indexOf('admin') !== -1) {
				appRouteName = 'Admin Panel';
			} else if(homeInitUrl.indexOf('conferences-list') !== -1) {
				appRouteName = 'Conferences';
			}

			return state.set('appRouteName', appRouteName);
	}

	return state;
};