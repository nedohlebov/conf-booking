import {INIT, START, SUCCESS, CONF} from '../constants/index';
import axios from 'axios';

export function init() {

	return (dispatch) => {
		dispatch({
			type: INIT + CONF + START
		});

		axios.get( 'https://conf-booking.firebaseio.com/confs.json' )
			.then( response => {
				dispatch({
					type: INIT + CONF + SUCCESS,
					response: {
						...response.data,
					}
				});
			} )
			.catch( error => {
			//
			} );

	}

}