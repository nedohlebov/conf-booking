import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Jumbotron} from 'react-bootstrap';

class Home extends Component {
	static propTypes = {
		smthing: PropTypes.bool.isRequired
	};

	render() {
		return (
			<Grid>
				<Row>
					<Col xs={12} md={12}>
						<br/>
						<br/>
						<Jumbotron>
							<h1>Ehhhhh!</h1>
						</Jumbotron>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default Home;