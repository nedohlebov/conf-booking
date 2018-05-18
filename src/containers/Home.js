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

	getConferences = () => {
		const { confs } = this.props;

		if (!confs.valueSeq().isEmpty()) {
			return confs.valueSeq().map(conf => <ConferenceLink key={conf.get('id')} id={conf.get('id')} title={conf.get('title')}/>);
		}

		return null;
	}


	render() {
		const { loading, confs } = this.props;

		if (loading) {
			return <Loading />;
		}

		return (
			<Grid>
				<Row>
					<Col xs={12} md={12}>
						<ListGroup>
							{this.getConferences()}
						</ListGroup>
					</Col>
				</Row>
			</Grid>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.home.get('loading'),
	confs: state.home.get('confs')
});

const mapDispatchToProps = { init };

export default connect(mapStateToProps, mapDispatchToProps)(Home);