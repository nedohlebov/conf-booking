import {Map, List, fromJS} from 'immutable';
import { INIT, START, SUCCESS, TIMETABLE, ERROR, LOAD, UNDO } from '../constants/index'
import {BOOKING, NEW, SET, TEAMS, UPDATE} from '../constants';
const defaultState = Map({
	'loading': false,
	'dateError': '',
	'confId': 0,
	'timetable': Map({}),
	'confs': Map({}),
	'dateId': '',
	'newTimetable': Map({}),
	'operation': '',
	'user': Map({}),
	'teams': Map({})
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
				.merge(fromJS({'timetable': response}))
				.set('loading', false)
				.set('dateId', payload.id);

		case TIMETABLE + ERROR:
			return state
				.set('dateError', payload.errorCode);

		case LOAD + TIMETABLE + START:
			return state
				.set('dateError', '')
				.set('loading', true);

		case TIMETABLE + UNDO + START:
			return state
				.set('loading', true);

		case SET + TIMETABLE + NEW:
			return state
				.set('operation', payload.operation)
				.set('newTimetable', payload.newTimetable)

		case TIMETABLE + UPDATE + BOOKING:
			return state
				.set('user', payload.user)
				.set('teams', payload.teams);
	}

	return state;
};