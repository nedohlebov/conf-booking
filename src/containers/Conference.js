import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Table, Checkbox } from 'react-bootstrap';
import {initConference, loadConferenceTimetable} from '../AC/conference';
import {connect} from 'react-redux';
import Loading from '../components/Loading';
import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment';

class Conference extends Component {
	static propTypes = {
		initConference: PropTypes.func.isRequired,
		loadConferenceTimetable: PropTypes.func.isRequired,
		timetable: PropTypes.object.isRequired,
		loading: PropTypes.bool.isRequired,
		dateError: PropTypes.string.isRequired,
		dateId: PropTypes.string.isRequired,
		confId: PropTypes.number.isRequired,
		confs: PropTypes.object.isRequired
	};

	componentDidMount() {
		const today = new Date();
		const todayKey =  today.getFullYear().toString() + '-' + (('0' + (today.getMonth() + 1)).slice(-2)).toString() + '-'+ today.getDate().toString();
		const currentConfId = parseInt(this.props.match.params.id);

		this.props.initConference(currentConfId, todayKey);
	}

	dateSelectOnChangeHandler (...data) {
		const currentConfId = this.confId;
		const today = new Date();
		const todayF = new Date(today.getFullYear(), today.getMonth(), today.getDate());
		const pickerDate = new Date(data[0]);
		const pickeDateF = new Date(pickerDate.getFullYear(), pickerDate.getMonth(), pickerDate.getDate());
		const pickerKey = data[0].slice(0, 10);
		if (pickeDateF < todayF) {
			this.loadConferenceTimetable('less');
		} else if ((pickeDateF - todayF) / (1000 * 60 *60 * 24) > 21) {
			this.loadConferenceTimetable('more');
		} else {
			this.loadConferenceTimetable(null, currentConfId, pickerKey);
		}

	}

	render() {
		const { loading, timetable, dateError, confId, dateId, confs } = this.props;

		if (loading) {
			return <Loading />;
		}

		let timetableCode = '';

		if (dateError === 'less') {
			timetableCode = 'Нельзя просматривать или резервировать на прошедшую дату.';
		} else if (dateError === 'more') {
			timetableCode = 'Нельзя просматривать или резервировать больше чем на 3 недели.';
		} else {
			const time = 9*60;
			timetableCode = timetable.valueSeq().map((key, value) =>
				<tr key={value} className={(key === 'free' ? 'free' : 'busy')}>
					<td>
						<Checkbox name={"timetable[" + value + "]"}></Checkbox>
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
					<Col xs={12}>
						<Table striped bordered condensed hover className={'timetable'}>
							<tbody>
								{timetableCode}
							</tbody>
						</Table>
					</Col>
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
		}
	}, {
		initConference,
		loadConferenceTimetable
	}
)(Conference);