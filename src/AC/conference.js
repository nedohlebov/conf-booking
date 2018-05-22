import {INIT, START, SUCCESS, TIMETABLE, ERROR, LOAD, CONF, UNDO, MESSAGE_POPUP, SHOW, TEAMS, HIDE } from '../constants/index';
import axios from 'axios';
import {AUTH_POPUP} from '../constants';

export function initConference(currentConfId, todayKey) {

	return (dispatch) => {
		dispatch({
			type: INIT + TIMETABLE + START,
			payload: {
				id: currentConfId,
				todayKey
			}
		});

		axios.get( 'https://conf-booking.firebaseio.com/confs.json' )
			.then( response => {
				dispatch({
					type: INIT + CONF + SUCCESS,
					response: {
						...response.data,
					}
				});
			});

		axios.get( 'https://conf-booking.firebaseio.com/timetables/' + currentConfId + '/' + todayKey + '/.json' )
			.then( response => {
				if (response.data === null) {
					const json = [
						"free", "free", "free", "free", "free", "free", "free", "free", "free", "free",
						"free", "free", "free", "free", "free", "free", "free", "free", "free", "free",
						"free", "free", "free", "free", "free", "free", "free", "free" ];

					axios.put('https://conf-booking.firebaseio.com/timetables/' + currentConfId + '/' + todayKey + '/.json', json)
						.then(
							dispatch({
								type: INIT + TIMETABLE + SUCCESS,
								payload: {
									id: todayKey
								},
								response: {
									...json,
								}
							}));
				} else {
					dispatch({
						type: INIT + TIMETABLE + SUCCESS,
						payload: {
							id: todayKey
						},
						response: {
							...response.data,
						}
					});
				}
			} )
			.catch( error => {
				//
			} );

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
						const json = [
							"free", "free", "free", "free", "free", "free", "free", "free", "free", "free",
							"free", "free", "free", "free", "free", "free", "free", "free", "free", "free",
							"free", "free", "free", "free", "free", "free", "free", "free" ];

						axios.put( 'https://conf-booking.firebaseio.com/timetables/' + id + '/' + date + '/.json', json )
							.then(
								dispatch({
									type: INIT + TIMETABLE + SUCCESS,
									payload: {
										id: date
									},
									response: {
										...json,
									}
								})
							);
					} else {
						dispatch({
							type: INIT + TIMETABLE + SUCCESS,
							payload: {
								id: date
							},
							response: {
								...response.data,
							}
						});
					}
				} )
				.catch( error => {
					//
				} );

		}
	}
}

export function timeBookingCheckAndAuth (newTimetable, operation) {
	if (!Object.keys(newTimetable).length) {
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
					operation
				}
			})
		}
	}
}

export function saveTimeBooking() {
	return 1;
}

export function undoTimeBooking () {
	return 1;
}