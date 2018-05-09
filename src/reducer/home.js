import { Map } from 'immutable';
const defaultState = Map({
	'smthing': false
});

export default (state = defaultState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'INIT':
			return state.set('smthing', true);


	}

	return state;
};