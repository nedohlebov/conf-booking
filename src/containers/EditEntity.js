import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Form, FormGroup, FormControl, Button, Col,ButtonToolbar } from 'react-bootstrap';
import { init } from '../AC/home';
import { initTeams } from '../AC/conference';
import { closeEntityPopup, inputTitle, inputPwd } from '../AC/editEntity';
import { updateTeam, updateConf } from '../AC/admin';
import { EDIT, CONF, TEAMS, ADD } from '../constants/index';
import md5 from 'md5';

class EditEntity extends Component {

	static propTypes = {
		editUserPopup: PropTypes.bool.isRequired,
		type: PropTypes.string.isRequired,
		operation: PropTypes.string.isRequired,
		id: PropTypes.any.isRequired,
		teams: PropTypes.object.isRequired,
		confs: PropTypes.object.isRequired,
		closeEntityPopup: PropTypes.func.isRequired,
		title: PropTypes.string.isRequired,
		pwd: PropTypes.string.isRequired,
		updateTeam: PropTypes.func.isRequired,
		updateConf: PropTypes.func.isRequired
	};

	inputTitleHandler = (e) => {
		this.props.inputTitle(e.target.value);
	};

	inputPwdHandler = (e) => {
		this.props.inputPwd(e.target.value);
	};

	updateEntityHandler = () => {
		const { teams, confs, type, operation, title, pwd } = this.props;

		if (operation !== EDIT) {
			if (type === CONF) {
				const newConfs = {};

				confs.valueSeq().forEach(conf => {
					const id = conf.get('title').toLowerCase().replace(/\s+/, '');
					newConfs[id] = {'title': conf.get('title')}
				});

				newConfs[title.toLowerCase().replace(/\s+/, '')] = {'title': title};

				this.props.updateConf(newConfs);
			} else if (type === TEAMS) {
				const newTeams = {};

				teams.valueSeq().forEach(team => {
					const id = team.get('title').toLowerCase().replace(/\s+/, '');
					newTeams[id] = {
						'title': team.get('title'),
						'password': team.get('password')
					};
				});

				newTeams[title.toLowerCase().replace(/\s+/, '')] = {
					'title': title,
					'password': md5(pwd)
				};

				this.props.updateTeam(newTeams);
			}
		}

		this.props.closeEntityPopup();

	};

	getPasswdCode = () => {
		const { type, pwd } = this.props;

		if (type !== CONF) {
			return <FormGroup>
				<Col sm={3}>
					Password
				</Col>
				<Col sm={9}>
					<FormControl type="password" placeholder="Password" name="password" value={pwd} onChange={this.inputPwdHandler} />
				</Col>
			</FormGroup>
		}
		return null;
	};

	closeEntityPopupHandler = () => {
		this.props.closeEntityPopup();
	};

	getPopupCode = () => {
		const { editUserPopup, operation, type, title } = this.props;

		const opTitle = operation === EDIT ? 'Edit' : 'Add';
		const typeTitle = type === CONF ? 'Conference' : 'Team';

		if (editUserPopup) {
			return <Modal.Dialog>
				<Modal.Header>
					<Modal.Title>{opTitle} {typeTitle} Information</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form horizontal>
						<FormGroup>
							<Col sm={3}>
								{typeTitle}
							</Col>
							<Col sm={9}>
								<FormControl type="text" placeholder="Title" name="login" value={title} onChange={this.inputTitleHandler} />
							</Col>
						</FormGroup>

						{ this.getPasswdCode() }

						<FormGroup>
							<Col smOffset={3} sm={9}>
								<ButtonToolbar>
									<Button onClick={() => this.updateEntityHandler()} bsStyle="success">
										Sign in
									</Button>
									<Button onClick={() => this.closeEntityPopupHandler()} bsStyle="danger">
										Close
									</Button>
								</ButtonToolbar>
							</Col>
						</FormGroup>

					</Form>
				</Modal.Body>
			</Modal.Dialog>
		}

		return null;
	};

	componentDidMount() {
		this.props.initTeams();
		this.props.init();
	}

	render () {
		return this.getPopupCode()
	}
}

export default connect(
	(state) => {
		return {
			editUserPopup: state.editEntity.get('editUserPopup'),
			type: state.authPopup.get('type'),
			operation: state.authPopup.get('operation'),
			id: state.authPopup.get('id'),
			teams: state.conference.get('teams'),
			confs: state.home.get('confs'),
			title: state.editEntity.get('title'),
			pwd: state.editEntity.get('pwd')
		};
	}, {
		initTeams,
		init,
		closeEntityPopup,
		inputTitle,
		inputPwd,
		updateTeam,
		updateConf
	}
)(EditEntity);