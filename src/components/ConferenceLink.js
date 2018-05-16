import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const conferenceLink = (props) => {
	return (
		<ListGroupItem href={`/conference/${props.id}`}>
			{ props.title }
		</ListGroupItem>
	);
};

export default conferenceLink;