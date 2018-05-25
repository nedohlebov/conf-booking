import { combineReducers } from 'redux';
import home from './home';
import conference from './conference';
import messagePopup from './messagePopup';
import authPopup from './authPopup';
import admin from './admin';

export default combineReducers({
	home,
	conference,
	messagePopup,
	authPopup,
	admin
});