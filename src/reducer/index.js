import { combineReducers } from 'redux';
import home from './home';
import conference from './conference';

export default combineReducers({
	home,
	conference
});