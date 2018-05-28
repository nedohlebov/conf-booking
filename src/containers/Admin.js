import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Table, Button, Glyphicon, ButtonToolbar } from 'react-bootstrap';
import { updateTeam, updateConf, handleAdmin, initEditEntityPopup } from '../AC/admin';
import { initTeams } from '../AC/conference';
import { init } from '../AC/home';
import {connect} from 'react-redux';
import Loading from '../components/Loading';
import { CONF, TEAMS, EDIT, ADD, DELETE} from '../constants/index';

class Admin extends Component {
	static propTypes = {
		initTeams: PropTypes.func.isRequired,
		init: PropTypes.func.isRequired,
		teams: PropTypes.object.isRequired,
		confs: PropTypes.object.isRequired,
		loading: PropTypes.bool.isRequired,
		handleAdmin: PropTypes.func.isRequired,
		type: PropTypes.string.isRequired,
		operation: PropTypes.string.isRequired,
		id: PropTypes.any.isRequired,
		isLogIn: PropTypes.bool.isRequired,
		updateConf: PropTypes.func.isRequired,
		updateTeam: PropTypes.func.isRequired,
		initEditEntityPopup: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.props.initTeams();
		this.props.init();

		setInterval(() => {
			this.props.initTeams();
			this.props.init();
		}, 5000);
	}

	componentDidUpdate() {
		const { isLogIn, teams, confs, operation, type, id } = this.props;

		if (isLogIn) {
			if (operation === DELETE) {
				if (type === CONF) {
					let newConfs = {};

					confs.valueSeq().forEach((conf) => {
						const curId = conf.get('title').toLowerCase().replace(/\s+/, '');
						if (curId !== id) {
							newConfs[curId] = {'title': conf.get('title')};
						}
					});

					this.props.updateConf(newConfs);
				} else if (type === TEAMS) {
					let newTeams = {};

					teams.valueSeq().forEach((team) => {
						const curId = team.get('title').toLowerCase().replace(/\s+/, '');
						if (curId !== id) {
							newTeams[curId] = {
								'title': team.get('title'),
								'password': team.get('password')
							};
						}
					});
					this.props.updateTeam(newTeams);
				}
			} else if (operation === EDIT) {
			// will be soon
			} else if (operation === ADD) {
				this.props.initEditEntityPopup();
			}
		}
	}

	adminFormHandler = (type, operation, id) => {
		this.props.handleAdmin(type, operation, id);
	};

	getConfsCode = () => {
		const { confs } = this.props;


		return confs.valueSeq().map(conf => {
			const id = conf.get('title').toLowerCase().replace(/\s+/, '');

			return <tr key={conf.get('title')}>
				<td>
					{ conf.get('title') }
				</td>
				<td>
					<ButtonToolbar>
						{/*<Button onClick={() => this.adminFormHandler(CONF, EDIT, id)} bsStyle="primary">*/}
							{/*<Glyphicon glyph="edit" />*/}
						{/*</Button>*/}
						<Button onClick={() => this.adminFormHandler(CONF, DELETE, id)} bsStyle="danger">
							<Glyphicon glyph="remove" />
						</Button>
					</ButtonToolbar>
				</td>
			</tr>
		});
	};

	getTeamsCode = () => {
		const { teams } = this.props;

		return teams.valueSeq().map(team => {
			const id = team.get('title').toLowerCase().replace(/\s+/, '');
			const hiddenClass = (id === 'admin' ? 'hidden' : '');

			return <tr key={id}>
					<td>
						{ team.get('title') }
					</td>
					<td>
						<ButtonToolbar>
							{/*<Button onClick={() => this.adminFormHandler(TEAMS, EDIT, id)} bsStyle="primary">*/}
								{/*<Glyphicon glyph="edit" />*/}
							{/*</Button>*/}
							<Button onClick={() => this.adminFormHandler(TEAMS, DELETE, id)} bsStyle="danger" className={hiddenClass}>
								<Glyphicon glyph="remove" />
							</Button>
						</ButtonToolbar>
					</td>
				</tr>
		});
	};

	render() {
		const { loading } = this.props;

		if (loading) {
			return <Loading />;
		}

		return (
			<Grid>
				<Row>
					<Col xs={12} md={12}>
						<h2>Conferences</h2>
						<Table striped bordered condensed hover>
							<tbody>
								{this.getConfsCode()}
								<tr key='addConf'>
									<td colSpan={2}>
										<Button bsStyle="success">
											<Glyphicon  onClick={() => this.adminFormHandler(CONF, ADD, '')} glyph="plus" />
										</Button>
									</td>
								</tr>
							</tbody>
						</Table>
					</Col>
					<Col xs={12} md={12}>
						<h2>Teams</h2>
						<Table striped bordered condensed hover>
							<tbody>
								{this.getTeamsCode()}
								<tr key='addTeam'>
									<td colSpan={2}>
										<Button onClick={() => this.adminFormHandler(TEAMS, ADD, '')} bsStyle="success">
											<Glyphicon glyph="plus" />
										</Button>
									</td>
								</tr>
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
			loading: state.admin.get('loading'),
			confs: state.home.get('confs'),
			teams: state.conference.get('teams'),
			type: state.authPopup.get('type'),
			operation: state.authPopup.get('operation'),
			id: state.authPopup.get('id'),
			isLogIn: state.authPopup.get('isLogIn'),
		}
	}, {
		init,
		initTeams,
		updateTeam,
		updateConf,
		handleAdmin,
		initEditEntityPopup
	}
)(Admin);