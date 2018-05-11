import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Jumbotron} from 'react-bootstrap';
import {init} from '../AC/home';
import {connect} from 'react-redux';

class Conference extends Component {
	static propTypes = {

	};

	render() {
		console.log(this.props);

		return (
			<Grid>
				<Row>
					<Col xs={12} md={12}>
						<br/>
						<br/>
						<Jumbotron>
							<h1>Conferences!</h1>
						</Jumbotron>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default Conference;