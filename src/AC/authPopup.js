import { AUTH_POPUP, HIDE, CHECK, CHANGE, INPUT_TEXT } from '../constants/index';

export function hideAuthPopup () {
	return {
		type: AUTH_POPUP + HIDE
	};
}

export function checkLogIn () {
	return {
		type: AUTH_POPUP + CHECK
	};
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