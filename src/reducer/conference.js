import { Map, List } from 'immutable';
import { INIT, START, SUCCESS, TIMETABLE, ERROR, LOAD } from '../constants/index'
const defaultState = Map({
	'loading': false,
	'dateError': '',
	'confId': 0,
	'timetable': Map({}),
	'confs': Map({}),
	'dateId': ''
});

export default (state = defaultState, action) => {
	const { type, payload, response } = action;
	switch (type) {
		case INIT + TIMETABLE + START:
			return state
				.set('loading', true)
				.set('confId', payload.id)
				.set('dateId', payload.todayKey)
				.set('confs', state.get('confs'));

		case INIT + TIMETABLE + SUCCESS:
			return state
				.merge({timetable: response})
				.set('loading', false)
				.set('dateId', payload.id);

		case TIMETABLE + ERROR:
			return state
				.set('dateError', payload.errorCode);

		case LOAD + TIMETABLE + START:
			return state
				.set('dateError', '')
				.set('loading', true);

	}

	return state;
};