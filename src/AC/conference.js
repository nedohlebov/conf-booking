import {INIT, START, SUCCESS, TIMETABLE, ERROR, LOAD, CONF, MESSAGE_POPUP, SHOW, NEW, SET, AUTH_POPUP, TEAMS, UPDATE, DEFAULT, CHECKING, CHANGE } from '../constants/index';
import axios from 'axios';
import {UNDO} from '../constants';

const json = [
	"free", "free", "free", "free", "free", "free", "free", "free", "free", "free",
	"free", "free", "free", "free", "free", "free", "free", "free", "free", "free",
	"free", "free", "free", "free", "free", "free", "free", "free" ];

export function initTeams() {
	return (dispatch) => {
		axios.get('https://conf-booking.firebaseio.com/teams.json')
			.then(response => {
				dispatch({
					type: INIT + TIMETABLE + TEAMS + SUCCESS,
					response: {
						...response.data,
					}
				});
			});
	}
}

function timetableStart (id, todayKey) {
	return {
		type: INIT + TIMETABLE + START,
		payload: {
			id,
			todayKey
		}
	}
}

function saveTimetable (id, data) {
	return {
		type: INIT + TIMETABLE + SUCCESS,
		payload: {
			id
		},
		response: {
			...data,
		}
	}
}

function saveConfs (data) {
	return {
		type: INIT + CONF + SUCCESS,
		response: {
			...data
		}
	}
}

export function initConference(currentConfId, todayKey) {

	return (dispatch) => {
		dispatch(timetableStart(currentConfId, todayKey));

		axios.get('https://conf-booking.firebaseio.com/confs.json')
			.then(response => {
				dispatch(saveConfs(response.data));
			});

		axios.get(`https://conf-booking.firebaseio.com/timetables/${currentConfId}/${todayKey}/.json`)
			.then(response => {
				if (response.data === null) {
					axios.put(`https://conf-booking.firebaseio.com/timetables/${currentConfId}/${todayKey}/.json`, json)
						.then(() => {
							dispatch(saveTimetable(todayKey, json))
						});
				} else {
					dispatch(saveTimetable(todayKey, response.data));
				}
			})
			.catch(error => {

			});
	}
}

export function loadConferenceTimetable(error, id, date) {
	if (error) {
		return (dispatch) => {
			dispatch({
				type: TIMETABLE + ERROR,
				payload: {
					errorCode: error
				}
			});
		}
	} else {
		return (dispatch) => {
			dispatch({
				type: LOAD + TIMETABLE + START
			});

			axios.get( 'https://conf-booking.firebaseio.com/timetables/' + id + '/' + date + '/.json' )
				.then( response => {
					if (response.data === null) {

						axios.put( 'https://conf-booking.firebaseio.com/timetables/' + id + '/' + date + '/.json', json )
							.then(() =>
								dispatch(saveTimetable(date, json))
							);
					} else {
						dispatch(saveTimetable(date, response.data))
					}
				} )
				.catch( error => {
					//
				} );

		}
	}
}

export function timeBookingCheckAndAuth (newTimetable, operation) {
	if (!newTimetable.size) {
		return (dispatch) => {
			dispatch ({
				type: MESSAGE_POPUP + SHOW,
				payload: {
					'title': 'Attention',
					'details': 'Nothing is selected. Please fill in and/or select needed values.',
				}
			})
		}
	} else {
		return (dispatch) => {
			dispatch ({
				type: AUTH_POPUP + SHOW,
				payload: {
					newTimetable,
					operation
				}
			});

			dispatch ({
				type: SET + TIMETABLE + NEW,
				payload: {
					newTimetable,
					operation
				}
			})
		}
	}
}


export function updateConferenceTimetable(tmpTimetable, error, confId, dateId) {
	return (dispatch) => {
		dispatch({
			type: AUTH_POPUP + SET + DEFAULT
		});

		dispatch({
			type: TIMETABLE + UNDO + CHECKING
		});

		dispatch({
			type: INIT + TIMETABLE + UPDATE,
			payload: {
				id: confId,
				todayKey: dateId,
				tmpTimetable
			}
		});

		axios.put('https://conf-booking.firebaseio.com/timetables/' + confId + '/' + dateId + '/.json', tmpTimetable)
			.then(response => {
				dispatch(saveTimetable(dateId, tmpTimetable));

				if (error) {
					dispatch ({
						type: MESSAGE_POPUP + SHOW,
						payload: {
							'title': 'Attention',
							'details': 'Некоторые поля не были обновлены. Обратитесь к администратору.',
						}
					})
				}
			});
	}
}

export function changeFieldCheckbox (id = '', isChecked = false) {
	return {
		type: CHANGE + CHECKING,
		payload: {
			id,
			isChecked
		}
	};
}