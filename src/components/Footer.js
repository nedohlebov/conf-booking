import React, { Component } from 'react';
import {  Grid, Row, Col } from 'react-bootstrap';

const footer = () => {
	return (
		<footer>
			<hr/>
			<Grid>
				<Row>
					<Col xs={12} md={12}>
						<p className="cb-copyright">&copy; 2018 Conference Booking</p>
					</Col>
				</Row>
			</Grid>
		</footer>
	);
}

export default footer;