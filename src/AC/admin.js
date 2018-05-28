import { AUTH_POPUP, ADMIN, SHOW } from '../constants/index';
import axios from 'axios';
import {CONF, DEFAULT, INIT, SET, SUCCESS, TEAMS, TIMETABLE} from '../constants';

export function updateConf (newConfs) {
	return (dispatch) => {
		dispatch({
			type: AUTH_POPUP + SET + DEFAULT
		});

		axios.put( 'https://conf-booking.firebaseio.com/confs.json', newConfs )
			.then(() =>
				axios.get( 'https://conf-booking.firebaseio.com/confs.json' )
					.then( response => {
						dispatch({
							type: INIT + CONF + SUCCESS,
							response: {
								...response.data,
							}
						});
					} )

			).catch( error => {
				//
			});
	}

}

export function updateTeam (newTeams) {
	return (dispatch) => {
		dispatch({
			type: AUTH_POPUP + SET + DEFAULT
		});

		axios.put( 'https://conf-booking.firebaseio.com/teams.json', newTeams )
			.then(() =>
				axios.get( 'https://conf-booking.firebaseio.com/teams.json' )
					.then( response => {
						dispatch({
							type: INIT + TIMETABLE + TEAMS + SUCCESS,
							response: {
								...response.data,
							}
						});
					} )

			).catch( error => {
			//
		});
	}
}

export function handleAdmin (type, operation, id) {
	return (dispatch) => {
		dispatch ({
			type: AUTH_POPUP + ADMIN + SHOW,
			payload: {
				type,
				operation,
				id
			}
		});
	}
}