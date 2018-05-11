import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Jumbotron} from 'react-bootstrap';
import { init } from '../AC/home';
import Loading from '../components/Loading';
import Conference from '../components/Conference';

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

		const conferences = confs.valueSeq().isEmpty() ? null : confs.valueSeq().map(conf => <Conference key={conf.get('id')} id={conf.get('id')} title={conf.get('title')}/>);

		return (
			<Grid>
				<Row>
					<Col xs={12} md={12}>
						{conferences}
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