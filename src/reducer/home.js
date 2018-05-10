import { Map } from 'immutable';
import { INIT, START, SUCCESS } from '../constants/index'
const defaultState = Map({
	'loading': false,
});

export default (state = defaultState, action) => {
	const { type, payload } = action;

	switch (type) {
		case INIT + START:
			return state.set('loading', true);

		case INIT + SUCCESS:
			return state.set('loading', false);

	}

	return state;
};