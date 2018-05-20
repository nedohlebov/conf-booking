import { Map, fromJS } from 'immutable';
import { MESSAGE_POPUP, SHOW, HIDE } from '../constants/index'
const defaultState = Map({
	'popupShow': false,
	'content': Map({
		'title': '',
		'details': '',
	}),
});

export default (state = defaultState, action) => {
	const { type, payload, response } = action;

	switch (type) {
		case MESSAGE_POPUP + SHOW:
			return state
				.update('content', content => content.merge(fromJS(payload)))
				.set('popupShow', true);

		case MESSAGE_POPUP + HIDE:
			return state
				.set('popupShow', false)
				.set('content', defaultState.get('content'));

	}

	return state;
};