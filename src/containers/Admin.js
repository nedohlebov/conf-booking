import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Table, Button, Glyphicon, ButtonToolbar } from 'react-bootstrap';
import { updateTeam, updateConf } from '../AC/admin';
import { initTeams } from '../AC/conference';
import { init } from '../AC/home';
import {connect} from 'react-redux';
import Loading from '../components/Loading';

class Admin extends Component {
	static propTypes = {
		initTeams: PropTypes.func.isRequired,
		init: PropTypes.func.isRequired,
		teams: PropTypes.object.isRequired,
		confs: PropTypes.object.isRequired,
		loading: PropTypes.bool.isRequired,
	};

	componentDidMount() {
		this.props.init();
		this.props.initTeams();
	}

	getConfsCode = () => {
		const { confs } = this.props;


		return confs.valueSeq().map(conf =>
			<tr key={conf.get('id')}>
				<td>
					{ conf.get('title') }
				</td>
				<td>
					<ButtonToolbar>
						<Button bsStyle="primary">
							<Glyphicon glyph="edit" />
						</Button>
						<Button bsStyle="danger">
							<Glyphicon glyph="remove" />
						</Button>
					</ButtonToolbar>
				</td>
			</tr>
		);
	};

	getTeamsCode = () => {
		const { teams } = this.props;

		return teams.valueSeq().map(team => {
			const hiddenClass = team === 'admin' ? 'hidden' : '';

			return <tr key={team}>
					<td>
						{ team.get('title') }
					</td>
					<td>
						<ButtonToolbar>
							<Button bsStyle="primary">
								<Glyphicon glyph="edit" />
							</Button>
							<Button bsStyle="danger" className={hiddenClass}>
								<Glyphicon glyph="remove" />
							</Button>
						</ButtonToolbar>
					</td>
				</tr>
		});
	};

	render() {
		const { loading } = this.props;
		console.log(this.props);

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
											<Glyphicon glyph="plus" />
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
										<Button bsStyle="success">
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
			teams: state.authPopup.get('teams'),
		}
	}, {
		init,
		initTeams,
		updateTeam,
		updateConf,
	}
)(Admin);