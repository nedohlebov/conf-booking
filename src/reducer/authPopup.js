import { Map, fromJS } from 'immutable';
import { AUTH_POPUP, SHOW, HIDE, CHANGE, INPUT_TEXT } from '../constants/index'
const defaultState = Map({
	'authPopupShow': false,
	'isLogIn': false,
	'authFailure': false,
	'user': Map({})
});

export default (state = defaultState, action) => {
	const { type, payload, response } = action;

	switch (type) {
		case AUTH_POPUP + SHOW:
			return state
				.set('authPopupShow', true);

		case AUTH_POPUP + HIDE:
			return state
				.set('authPopupShow', defaultState.get('authPopupShow'))
				.set('isLogIn', defaultState.get('isLogIn'));

		case CHANGE + INPUT_TEXT:
			return state.setIn(['user', payload.fieldName], payload.fieldText);

	}

	return state;
};