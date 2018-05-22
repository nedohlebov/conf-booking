import { AUTH_POPUP, HIDE, CHECK, CHANGE, INPUT_TEXT, ERROR, INIT, SUCCESS, TEAMS } from '../constants/index';
import axios from 'axios';
import md5 from 'md5';

export function hideAuthPopup () {
	return {
		type: AUTH_POPUP + HIDE
	};
}

export function checkLogIn (user, teams, operation) {
	if (teams.get(user.get('login')) && (md5(user.get('password')) === teams.get(user.get('login')).get('password'))) {
		return {
			type: AUTH_POPUP + CHECK + SUCCESS,
			payload: {
				operation
			}
		}
	} else {
		return {
			type: AUTH_POPUP + CHECK + ERROR,
		}
	}
}

export function changeFieldInput(fieldName = '', fieldText = '') {
	return {
		type: CHANGE + INPUT_TEXT,
		payload: {
			fieldName,
			fieldText
		}
	};
}

export function initTeams() {
	return (dispatch) => {

		axios.get( 'https://conf-booking.firebaseio.com/teams.json' )
		.then( response => {
			dispatch({
				type: INIT + TEAMS + SUCCESS,
				response: {
					...response.data,
				}
			});
		});
	}
}