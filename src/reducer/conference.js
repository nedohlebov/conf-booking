import {Map, fromJS} from 'immutable';
import { INIT, START, SUCCESS, TIMETABLE, ERROR, LOAD, UNDO, BOOKING, NEW, SET, TEAMS, UPDATE } from '../constants/index'
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
	'teams': Map({}),
	'isLogIn': false,
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

		case INIT + TIMETABLE + TEAMS + SUCCESS:
			return state
				.merge(fromJS({'teams': response}));

		case INIT + TIMETABLE + SUCCESS:
			return state
				.merge(fromJS({'timetable': response}))
				.set('loading', false)
				.set('dateId', payload.id)
				.set('isLogIn', false)
				.set('user', defaultState.get('user'));

		case INIT + TIMETABLE + UPDATE:
			return state
				.set('isLogIn', false)
				.set('user', defaultState.get('user'))
				.merge(fromJS({'timetable': payload.tmpTimetable}))
				.set('newTimetable', defaultState.get('newTimetable'));

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
				.set('newTimetable', payload.newTimetable);

		case TIMETABLE + UPDATE + BOOKING:
			return state
				.set('user', payload.user)
				.set('teams', payload.teams)
				.set('isLogIn', true);
	}

	return state;
};