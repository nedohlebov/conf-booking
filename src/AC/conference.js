import {INIT, START, SUCCESS, TIMETABLE, ERROR, LOAD} from '../constants/index';
import axios from 'axios';

export function initConference(currentConfId, todayKey) {

	return (dispatch) => {
		dispatch({
			type: INIT + TIMETABLE + START
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
		return {
			type: TIMETABLE + ERROR,
			payload: {
				errorCode: error
			}
		}
	} else {
		return (dispatch) => {
			dispatch({
				type: LOAD + TIMETABLE + START
			});

			axios.get( 'https://conf-booking.firebaseio.com/timetables/' + id + '/' + date + '/.json' )
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
}