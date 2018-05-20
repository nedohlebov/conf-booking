import { MESSAGE_POPUP, HIDE } from '../constants/index';

export function hideMessagePopup () {
	return {
		type: MESSAGE_POPUP + HIDE
	};
}