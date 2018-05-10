import {SET, ROUTE } from '../constants/index';

export function setRoute (routeName) {
	return {
		type: SET + ROUTE,
		payload: {
			routeName
		}
	};
}
