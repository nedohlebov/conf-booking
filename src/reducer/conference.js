import { Map } from 'immutable';
import { INIT, START, SUCCESS, TIMETABLE } from '../constants/index'
const defaultState = Map({
	'loading': false,
	'dateError': false,
	'timetable': Map({})
});

export default (state = defaultState, action) => {
	const { type, payload, response } = action;

	switch (type) {
		case INIT + TIMETABLE + START:
			return state.set('loading', true);

		case INIT + TIMETABLE + SUCCESS:
			const timetable = {};
			timetable[payload.id] = response;
			console.log(timetable);
			return state.merge(timetable).set('loading', false);

	}

	return state;
};