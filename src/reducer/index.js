import { combineReducers } from 'redux';
import home from './home';
import header from './header';

export default combineReducers({
	home,
	header
});