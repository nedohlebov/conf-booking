import { AUTH_POPUP, HIDE, CHECK, CHANGE, INPUT_TEXT, ERROR, SUCCESS, UPDATE, TIMETABLE, BOOKING, UNDO, CHECKING } from '../constants/index';
import md5 from 'md5';

export function hideAuthPopup () {
	return (dispatch) => {
		dispatch({
			type: AUTH_POPUP + HIDE
		});

		dispatch({
			type: TIMETABLE + UNDO + CHECKING
		});
	};
}

export function checkLogIn (user, teams, isAdmin) {
	if (isAdmin) {
		if (user.get('login') === 'admin' && user.get('password') && (md5(user.get('password')) === teams.get(user.get('login')).get('password'))) {
			return (dispatch) => {
				dispatch({
					type: AUTH_POPUP + CHECK + SUCCESS
				});
			}
		}
	} else {
		if (teams.get(user.get('login')) && user.get('password') && (md5(user.get('password')) === teams.get(user.get('login')).get('password'))) {
			return (dispatch) => {
				dispatch({
					type: AUTH_POPUP + CHECK + SUCCESS
				});

				dispatch({
					type: TIMETABLE + UPDATE + BOOKING,
					payload: {
						user,
						teams,
					}
				});
			}

		}
	}

	return {
		type: AUTH_POPUP + CHECK + ERROR,
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