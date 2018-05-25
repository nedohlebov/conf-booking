import { Map, fromJS } from 'immutable';
import { INIT, UPDATE, TEAMS, CONF, START, SUCCESS } from '../constants/index';

const defaultState = Map({
	'teams': Map({}),
	'confs': Map({}),
	'loading': false
});

export default (state = defaultState, action) => {
	const { type, payload, response } = action;

	switch (type) {
		case UPDATE + CONF:
			return state;

		case UPDATE + TEAMS:
			return state;

	}

	return state;
};