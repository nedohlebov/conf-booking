import { Map, fromJS } from 'immutable';
import { AUTH_POPUP, SHOW, HIDE, CHANGE, INPUT_TEXT, TEAMS, INIT, SUCCESS, ERROR, CHECK } from '../constants/index';

const defaultState = Map({
	'authPopupShow': false,
	'isLogIn': false,
	'authFailure': false,
	'user': Map({}),
	'teams': Map({}),
	'operation': ''
});

export default (state = defaultState, action) => {
	const { type, payload, response } = action;

	switch (type) {
		case AUTH_POPUP + SHOW:
			return state
				.set('authPopupShow', true)
				.set('operation', payload.operation);

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

	}

	return state;
};