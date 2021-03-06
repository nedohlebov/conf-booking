import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Button , Jumbotron, Glyphicon} from 'react-bootstrap';

const notFound = () => {
	return (
		<Grid>
			<Row>
				<Col xs={12} md={12}>
					<br/>
					<br/>
					<Jumbotron>
						<h1>Oops!</h1>
						<p>404. Not found.</p>
						<p></p>
						<p>
							<Link to={'/'}>
								<Button bsStyle="primary">
									<Glyphicon glyph="home" />&nbsp;&nbsp;&nbsp;Home
								</Button>
							</Link>
						</p>
					</Jumbotron>
				</Col>
			</Row>
		</Grid>
	);
}

export default notFound;