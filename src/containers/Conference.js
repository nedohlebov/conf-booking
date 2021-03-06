import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Table, Checkbox, Button, Glyphicon, ButtonToolbar } from 'react-bootstrap';
import {initConference, loadConferenceTimetable, timeBookingCheckAndAuth, updateConferenceTimetable, initTeams, changeFieldCheckbox } from '../AC/conference';
import {connect} from 'react-redux';
import Loading from '../components/Loading';
import DatePicker from 'react-bootstrap-date-picker';

class Conference extends Component {
	static propTypes = {
		initConference: PropTypes.func.isRequired,
		loadConferenceTimetable: PropTypes.func.isRequired,
		timetable: PropTypes.object.isRequired,
		loading: PropTypes.bool.isRequired,
		dateError: PropTypes.string.isRequired,
		dateId: PropTypes.string.isRequired,
		confId: PropTypes.string.isRequired,
		confs: PropTypes.object.isRequired,
		timeBookingCheckAndAuth: PropTypes.func.isRequired,
		operation: PropTypes.string.isRequired,
		newTimetable: PropTypes.object.isRequired,
		teams: PropTypes.object.isRequired,
		isLogIn: PropTypes.bool.isRequired,
		user: PropTypes.object.isRequired,
		updateConferenceTimetable: PropTypes.func.isRequired,
		initTeams: PropTypes.func.isRequired,
		changeFieldCheckbox: PropTypes.func.isRequired,
		checking: PropTypes.object.isRequired
	};

	updateConferenceTimetableHandler = (tmpTimetable, error, confId, dateId) => {
		this.props.updateConferenceTimetable(tmpTimetable, error, confId, dateId);
	};

	initC = () => {
		const today = new Date();
		const todayKey = this.props.dateId || today.getFullYear().toString() + '-' + (('0' + (today.getMonth() + 1)).slice(-2)).toString() + '-' + (('0' + today.getDate()).slice(-2)).toString();
		const currentConfId = this.props.match.params.id;

		this.props.initConference(currentConfId, todayKey);
		this.props.initTeams();
	};

	componentDidMount() {
		this.initC();

		setInterval(() => {
			this.initC();
		}, 5000);

	}

	componentDidUpdate() {
		const { isLogIn, operation, user, timetable, newTimetable, confId, dateId } = this.props;

		if (isLogIn) {
			let tmpTimetable = {};
			let error = false;
			const userName = user.get('login');

			if (operation === 'undo') {
				timetable.forEach((key, value) => {
					if (newTimetable.get(value)) {
						if (userName === 'admin') {
							tmpTimetable[value] = 'free';
						} else {
							if (key === userName) {
								tmpTimetable[value] = 'free';
							} else {
								tmpTimetable[value] = key;
								error = true;
							}
						}
					} else {
						tmpTimetable[value] = key;
					}
				});
			} else {
				timetable.map((key, value) => {
					if (newTimetable.get(value)) {
						if (userName === 'admin') {
							tmpTimetable[value] = 'admin';
						} else {
							if (key === userName || key === 'free') {
								tmpTimetable[value] = userName;
							} else {
								tmpTimetable[value] = key;
								error = true;
							}
						}
					} else {
						tmpTimetable[value] = key;
					}
				});
			}

			this.updateConferenceTimetableHandler(tmpTimetable, error, confId, dateId);
		}
	}

	dateSelectOnChangeHandler = (...data) => {
		const currentConfId = this.props.confId;

		const today = new Date();
		const todayF = new Date(today.getFullYear(), today.getMonth(), today.getDate());
		const pickerDate = data[0] ? new Date(data[0]) : new Date();
		const pickeDateF = new Date(pickerDate.getFullYear(), pickerDate.getMonth(), pickerDate.getDate());
		const pickerKey = data[0] ? data[0].slice(0, 10) : this.props.dateId;
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

	changeTimeBookingHandler = (e, newTimetable) => {
		const id = e.target.name.match(/\d+/g)[0];
		this.props.changeFieldCheckbox(id, e.target.checked);
	};

	getTimetableCode = (newTimetable) => {
		const { dateError, timetable, teams, isLogIn, checking } = this.props;
		let chk = {};
		checking.forEach((k, v) => chk[v] = k);

		if (dateError === 'less') {
			return <tr><td>Нельзя просматривать или резервировать на прошедшую дату.</td></tr>;
		} else if (dateError === 'more') {
			return <tr><td>Нельзя просматривать или резервировать больше чем на 90 дней.</td></tr>;
		} else {
			const time = 9*60;
			return timetable.sortBy((v, k) => parseInt(k)).valueSeq().map((key, value) => {
				const checked = chk[value] ? 'checked': '';

				return <tr key={value} className={(key === 'free' ? 'free' : 'busy')}>
					<td>
						<Checkbox checked={checked} onChange={(e) => this.changeTimeBookingHandler(e, newTimetable)} name={"timetable[" + value + "]"} >
						</Checkbox>
					</td>
					<td className={'time'}>
						{parseInt((time + value * 15) / 60) + ':' + (('0' + ((time + value * 15) % 60)).slice(-2)) + ' - ' + parseInt((time + value * 15 + 15) / 60) + ':' + (('0' + ((time + value * 15 + 15) % 60) ).slice(-2))}
					</td>
					<td>
						{(key === 'free' ? '' : (teams.get(key) ? teams.get(key).get('title') : ''))}
					</td>
				</tr>
			});
		}
	};

	render() {
		const { confId, dateId, newTimetable } = this.props;

		//if (loading) {
		//	return <Loading />;
		//}

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
			isLogIn: state.authPopup.get('isLogIn'),
			checking: state.conference.get('checking')
		}
	}, {
		initConference,
		loadConferenceTimetable,
		timeBookingCheckAndAuth,
		updateConferenceTimetable,
		initTeams,
		changeFieldCheckbox
	}
)(Conference);