import { Map, fromJS } from 'immutable';
import { AUTH_POPUP, SHOW, HIDE, CHANGE, INPUT_TEXT, TEAMS, INIT, SUCCESS, ERROR, CHECK, SET, DEFAULT, ADMIN } from '../constants/index';

const defaultState = Map({
	'authPopupShow': false,
	'isLogIn': false,
	'authFailure': false,
	'user': Map({}),
	'teams': Map({}),
	'confs': Map({}),
	'operation': '',
	'type': '',
	'id': '',
	'isAdmin': false
});

export default (state = defaultState, action) => {
	const { type, payload, response } = action;

	switch (type) {
		case AUTH_POPUP + SHOW:
			return state
				.set('isLogIn', defaultState.get('isLogIn'))
				.set('authPopupShow', true)
				.set('operation', payload.operation)
				.set('isAdmin', defaultState.get('isAdmin'));

		case AUTH_POPUP + ADMIN + SHOW:
			return state
				.set('isLogIn', defaultState.get('isLogIn'))
				.set('authPopupShow', true)
				.set('operation', payload.operation)
				.set('type', payload.type)
				.set('id', payload.id)
				.set('isAdmin', true);

		case AUTH_POPUP + HIDE:
			return state
				.set('authPopupShow', defaultState.get('authPopupShow'))
				.set('isLogIn', defaultState.get('isLogIn'));

		case CHANGE + INPUT_TEXT:
			return state.setIn(['user', payload.fieldName], payload.fieldText);

		case INIT + TEAMS + SUCCESS:
			return state
				.merge(fromJS({'teams': response}));

		case AUTH_POPUP + CHECK + SUCCESS:
			return state
				.set('authFailure', defaultState.get('authFailure'))
				.set('isLogIn', true)
				.set('authPopupShow', defaultState.get('authPopupShow'));

		case AUTH_POPUP + CHECK + ERROR:
			return state
				.set('authFailure', true)
				.set('isLogIn', defaultState.get('isLogIn'));

		case AUTH_POPUP + SET + DEFAULT:
			return state
				.set('isLogIn', defaultState.get('isLogIn'));

	}

	return state;
};