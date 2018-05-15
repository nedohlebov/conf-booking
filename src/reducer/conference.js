import { Map } from 'immutable';
import { INIT, START, SUCCESS, TIMETABLE, ERROR, LOAD } from '../constants/index'
const defaultState = Map({
	'loading': false,
	'dateError': '',
	'confId': 0,
	'timetable': Map({})
});

export default (state = defaultState, action) => {
	const { type, payload, response } = action;
	console.log(TIMETABLE + ERROR);
	console.log(type);

	switch (type) {
		case INIT + TIMETABLE + START:
			return state.set('loading', true).set('confId', payload.id);

		case INIT + TIMETABLE + SUCCESS:
			const timetable = {};
			timetable[payload.id] = response;
			console.log(timetable);
			return state.merge(timetable).set('loading', false);

		case TIMETABLE + ERROR:
			console.log('reducer');
			return state.set('dateError', payload.errorCode);

		case LOAD + TIMETABLE + START:
			return state.set('dateError', false);

	}

	return state;
};