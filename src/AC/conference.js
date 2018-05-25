import {INIT, START, SUCCESS, TIMETABLE, ERROR, LOAD, CONF, MESSAGE_POPUP, SHOW, NEW, SET, AUTH_POPUP, TEAMS, UPDATE, DEFAULT } from '../constants/index';
import axios from 'axios';

export function initTeams() {
	return (dispatch) => {
		axios.get('https://conf-booking.firebaseio.com/teams.json')
			.then(response => {
				console.log(response.data);
				dispatch({
					type: INIT + TIMETABLE + TEAMS + SUCCESS,
					response: {
						...response.data,
					}
				});
			});
	}
}

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
	console.log(tmpTimetable);
	return (dispatch) => {
		dispatch({
			type: AUTH_POPUP + SET + DEFAULT
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
				dispatch({
					type: INIT + TIMETABLE + SUCCESS,
					payload: {
						id: dateId
					},
					response: {
						...tmpTimetable,
					}
				});

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