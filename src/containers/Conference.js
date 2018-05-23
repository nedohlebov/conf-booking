import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Table, Checkbox, Button, Glyphicon, ButtonToolbar } from 'react-bootstrap';
import {initConference, loadConferenceTimetable, undoTimeBooking, saveTimeBooking, timeBookingCheckAndAuth} from '../AC/conference';
import {connect} from 'react-redux';
import Loading from '../components/Loading';
import DatePicker from 'react-bootstrap-date-picker';
//import LoginForm from '../components/LoginForm';

class Conference extends Component {
	static propTypes = {
		initConference: PropTypes.func.isRequired,
		loadConferenceTimetable: PropTypes.func.isRequired,
		timetable: PropTypes.object.isRequired,
		loading: PropTypes.bool.isRequired,
		dateError: PropTypes.string.isRequired,
		dateId: PropTypes.string.isRequired,
		confId: PropTypes.number.isRequired,
		confs: PropTypes.object.isRequired,
		undoTimeBooking: PropTypes.func.isRequired,
		timeBookingCheckAndAuth: PropTypes.func.isRequired,
		saveTimeBooking: PropTypes.func.isRequired,
		operation: PropTypes.string.isRequired,
		newTimetable: PropTypes.object.isRequired,
		teams: PropTypes.object.isRequired,
		isLogIn: PropTypes.bool.isRequired
	};

	componentDidMount() {
		const today = new Date();
		const todayKey =  today.getFullYear().toString() + '-' + (('0' + (today.getMonth() + 1)).slice(-2)).toString() + '-'+ today.getDate().toString();
		const currentConfId = parseInt(this.props.match.params.id);

		this.props.initConference(currentConfId, todayKey);
	}

	componentDidUpdate() {
		console.log('update!!');
	}

	dateSelectOnChangeHandler = (...data) => {
		const currentConfId = this.props.confId;

		const today = new Date();
		const todayF = new Date(today.getFullYear(), today.getMonth(), today.getDate());
		const pickerDate = new Date(data[0]);
		const pickeDateF = new Date(pickerDate.getFullYear(), pickerDate.getMonth(), pickerDate.getDate());
		const pickerKey = data[0].slice(0, 10);
		if (pickeDateF < todayF) {
			this.props.loadConferenceTimetable('less');
		} else if ((pickeDateF - todayF) / (1000 * 60 *60 * 24) > 90) {
			this.props.loadConferenceTimetable('more');
		} else {
			this.props.loadConferenceTimetable(null, currentConfId, pickerKey);
		}

	};

	timeBookingCheckAndAuthHandler = (newTimetable, operation) => {
		this.props.timeBookingCheckAndAuth(newTimetable, operation);
	};

	saveTimeBookingHandler = () => {
		saveTimeBooking();
	};

	undoTimeBookingHandler = () => {
		undoTimeBooking();
	};

	changeTimeBookingHandler = (e, newTimetable) => {
		const id = e.target.name.match(/\d+/g)[0];

		if (e.target.checked) {
			newTimetable[id] = e.target.checked;
		} else {
			delete newTimetable[id];
		}
	};

	getTimetableCode = (newTimetable) => {
		const { dateError, timetable } = this.props;

		if (dateError === 'less') {
			return <tr><td>Нельзя просматривать или резервировать на прошедшую дату.</td></tr>;
		} else if (dateError === 'more') {
			return <tr><td>Нельзя просматривать или резервировать больше чем на 90 дней.</td></tr>;
		} else {
			const time = 9*60;
			return timetable.valueSeq().map((key, value) =>
				<tr key={value} className={(key === 'free' ? 'free' : 'busy')}>
					<td>
						<Checkbox onChange={(e) => this.changeTimeBookingHandler(e, newTimetable)} name={"timetable[" + value + "]"}></Checkbox>
					</td>
					<td className={'time'}>
						{parseInt((time + value * 15) / 60) + ':' + (('0' + ((time + value * 15) % 60)).slice(-2)) + ' - ' + parseInt((time + value * 15 + 15) / 60) + ':' + (('0' + ((time + value * 15 + 15) % 60) ).slice(-2))}
					</td>
					<td>
						{(key === 'free' ? '' : 'ffff')}
					</td>
				</tr>
			);
		}
	};

	render() {
		const { loading, confId, dateId, operation } = this.props;

		let newTimetable = {};

		if (loading) {
			return <Loading />;
		}

		if (operation === 'undo')

		console.log(this.props);

		return (
			<Grid>
				<Row>
					<Col xs={12} md={4} lg={4}>
						<DatePicker
							onChange = {this.dateSelectOnChangeHandler}
							confId = { confId }
							value={ dateId }
							loadConferenceTimetable = {this.props.loadConferenceTimetable}
						/>
					</Col>
				</Row>
				<Row className={'timetable-container'}>
					<form>
						<Col xs={12}>
							<Table striped bordered condensed hover className={'timetable'}>
								<tbody>
									{this.getTimetableCode(newTimetable)}
								</tbody>
							</Table>
						</Col>
						<Col xs={12}>
							<ButtonToolbar>
								<Button onClick={() => this.timeBookingCheckAndAuthHandler(newTimetable, 'save')} bsStyle="success">
									<Glyphicon glyph="floppy-disk" />{' '}Save
								</Button>
								<Button onClick={() => this.timeBookingCheckAndAuthHandler(newTimetable, 'undo')} bsStyle="danger">
									<Glyphicon glyph="remove" />{' '}Clear
								</Button>
							</ButtonToolbar>
						</Col>
					</form>

				</Row>
			</Grid>
		);
	}
}

export default connect(
	(state) => {
		return {
			timetable: state.conference.get('timetable'),
			loading: state.conference.get('loading'),
			dateError: state.conference.get('dateError'),
			confId: state.conference.get('confId'),
			confs: state.home.get('confs'),
			dateId: state.conference.get('dateId'),
			undoTimeBooking: state.conference.get('undoTimeBooking'),
			operation: state.authPopup.get('operation'),
			newTimetable: state.conference.get('newTimetable'),
			user: state.authPopup.get('user'),
			teams: state.conference.get('teams'),
			isLogIn: state.authPopup.get('authPopup')
		}
	}, {
		initConference,
		loadConferenceTimetable,
		undoTimeBooking,
		timeBookingCheckAndAuth,
		saveTimeBooking,
	}
)(Conference);