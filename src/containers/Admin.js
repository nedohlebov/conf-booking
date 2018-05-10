import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Jumbotron} from 'react-bootstrap';

class Admin extends Component {
	static propTypes = {
	};

	render() {
		return (
			<Grid>
				<Row>
					<Col xs={12} md={12}>
						<br/>
						<br/>
						<Jumbotron>
							<h1>Admin!</h1>
						</Jumbotron>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default Admin;