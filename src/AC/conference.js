import {INIT, START, SUCCESS, TIMETABLE, ERROR, LOAD, CONF} from '../constants/index';
import axios from 'axios';

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
					const json = '[ "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free" ]';

					axios.put( 'https://conf-booking.firebaseio.com/timetables/' + currentConfId + '/' + todayKey + '/.json', json )
						.then(
							dispatch({
								type: INIT + TIMETABLE + SUCCESS,
								payload: {
									id: todayKey
								},
								response: {
									...response.data,
								}
							})
						);
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
						const json = [ "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free", "free" ];

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