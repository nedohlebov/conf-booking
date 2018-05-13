import { Map } from 'immutable';
import { INIT, START, SUCCESS, CONF } from '../constants/index'
const defaultState = Map({
	'loading': false,
	'confs': Map({})
});

export default (state = defaultState, action) => {
	const { type, payload, response } = action;

	switch (type) {
		case INIT + CONF + START:
			return state.set('loading', true);

		case INIT + CONF + SUCCESS:
			return state.merge({confs: response}).set('loading', false);

	}

	return state;
};