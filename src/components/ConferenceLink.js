import React from 'react';
import { NavItem } from 'react-bootstrap';

const conferenceLink = (props) => {
	return (
		<NavItem href={`/conference/${props.id}`}>
			{ props.title }
		</NavItem>
	);
};

export default conferenceLink;