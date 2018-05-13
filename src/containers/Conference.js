import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Jumbotron} from 'react-bootstrap';
import {initConference, loadConferenceTimetable} from '../AC/conference';
import {connect} from 'react-redux';
import Loading from '../components/Loading';
import DatePicker from 'react-bootstrap-date-picker';

class Conference extends Component {
	static propTypes = {
		initConference: PropTypes.func.isRequired,
		loadConferenceTimetable: PropTypes.func.isRequired,
		timetable: PropTypes.object.isRequired,
		loading: PropTypes.bool.isRequired,
		dateError: PropTypes.bool.isRequired,
	};

	componentDidMount() {
		const today = new Date();
		const todayKey = (('0' + (today.getMonth() + 1)).slice(-2)).toString() + today.getDate().toString() + today.getFullYear().toString();
		const currentConfId = parseInt(this.props.match.params.id);

		this.props.initConference(currentConfId, todayKey);
	}

	dateSelectOnChangeHandler (...data) {
		const currentConfId = parseInt(this.props.match.params.id);
		const today = new Date();
		const todayF = new Date(today.getFullYear(), today.getMonth(), today.getDate());
		const pickerDate = new Date(data[0]);
		const pickeDateF = new Date(pickerDate.getFullYear(), pickerDate.getMonth(), pickerDate.getDate());
		const pickerKey = (('0' + (pickerDate.getMonth() + 1)).slice(-2)).toString() + pickerDate.getDate().toString() + pickerDate.getFullYear().toString();
		if (pickeDateF < todayF) {
			this.props.loadConferenceTimetable('less');
			timetable = 'Нельзя просматривать или резервировать на прошедшую дату.';
		} else if ((pickeDateF - todayF) / (1000 * 60 *60 * 24) > 21) {
			this.props.loadConferenceTimetable('more');
			timetable = 'Нельзя просматривать или резервировать больше чем на 3 недели.'
		} else {
			this.props.loadConferenceTimetable(null, currentConfId, pickerDate);
		}

	}

	render() {
		const { loading, timetable, dateError } = this.props;


		if (loading) {
			return <Loading />;
		}

		if (dateError === 'less') {

		} else if (dateError === 'more') {

		} else {

		}

		return (
			<Grid>
				<Row>
					<Col xs={12} md={4} lg={4}>
						<DatePicker
							onChange = {this.dateSelectOnChangeHandler}
						/>
					</Col>
				</Row>
				<Row>
					{timetableCode}
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
			dateError: state.conference.get('dateError')
		}
	}, {
		initConference,
		loadConferenceTimetable
	}
)(Conference);