import { Map } from 'immutable';
import { ENTITY_POPUP, SHOW, HIDE, CHANGE, TITLE, PWD } from '../constants/index';
import {DEFAULT, SET} from '../constants';

const defaultState = Map({
	'editUserPopup': false,
	'title': '',
	'pwd': ''

});

export default (state = defaultState, action) => {
	const { type, payload, response } = action;

	switch (type) {
		case ENTITY_POPUP + SHOW:
			return state
				.set('editUserPopup', true);

		case ENTITY_POPUP + HIDE:
			return state
				.set('editUserPopup', defaultState.get('editUserPopup'));

		case CHANGE + TITLE:
			return state
				.set('title', payload.e || '');

		case CHANGE + PWD:
			return state
				.set('pwd', payload.e || '');

		case  ENTITY_POPUP + SET + DEFAULT:
			return state
				.set('editUserPopup', defaultState.get('editUserPopup'));
	}

	return state;
};

