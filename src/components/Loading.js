import React from 'react';
import { Glyphicon } from 'react-bootstrap';

const loading = () => {
	return (
		<div className={'loading'}>
			<span>
				Loading...{' '}<Glyphicon glyph="hourglass" />
			</span>
		</div>
	);
};

export default loading;