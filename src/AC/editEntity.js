import md5 from 'md5';
import {ENTITY_POPUP, HIDE, AUTH_POPUP, CHANGE, TITLE, PWD} from '../constants/index';

export function closeEntityPopup () {
	return (dispatch) => {
		dispatch({
			type: AUTH_POPUP + HIDE
		});

		dispatch({
			type: ENTITY_POPUP + HIDE
		});
	};
}

export function inputTitle (e) {
	return {
		type: CHANGE + TITLE,
		payload: {
			e
		}
	};
}

export function inputPwd (e) {
	return {
		type: CHANGE + PWD,
		payload: {
			e
		}
	};
}
