import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Row, Col, ListGroup} from 'react-bootstrap';
import { init } from '../AC/home';
import Loading from '../components/Loading';
import ConferenceLink from '../components/ConferenceLink';

class Home extends Component {
	static propTypes = {
		init: PropTypes.func.isRequired,
		loading: PropTypes.bool.isRequired,
		confs: PropTypes.object.isRequired
	};

	componentDidMount() {
		this.props.init();
	}

	render() {
		const { loading, confs } = this.props;

		if (loading) {
			return <Loading />;
		}
		console.log('confs', confs);
		const conferences = confs.valueSeq().isEmpty() ? null : confs.valueSeq().map(conf => <ConferenceLink key={conf.get('id')} id={conf.get('id')} title={conf.get('title')}/>);

		return (
			<Grid>
				<Row>
					<Col xs={12} md={12}>
						<ListGroup>
							{conferences}
						</ListGroup>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default connect(
	(state) => {
		return {
			loading: state.home.get('loading'),
			confs: state.home.get('confs')
		}
	}, {
		init
	}
)(Home);