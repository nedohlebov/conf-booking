import React from 'react';
import { Link } from 'react-router-dom';

const conference = (props) => {
	return (
		<div className={'conference'}>
			<Link to={`/conference/:id${props.id}`}>
				{ props.title }
			</Link>
		</div>
	);
};

export default conference;