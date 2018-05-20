import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { hideMessagePopup } from '../AC/messagePopup';

class MessagePopup extends Component {

	static propTypes = {
		content: PropTypes.object.isRequired,
		popupShow: PropTypes.bool.isRequired,
	};

	closePopupHandler = () => {
		this.props.hideMessagePopup();
	};

	render () {
		const { popupShow, content } = this.props;
		const { title, details } = content.toJS();

		return popupShow ?
			<Modal.Dialog>
				<Modal.Header>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>

				<Modal.Body>{details}</Modal.Body>

				<Modal.Footer>
					<Button onClick={this.closePopupHandler}>Close</Button>
				</Modal.Footer>
			</Modal.Dialog> : null;
	}
}

export default connect(
	(state) => {
		return {
			content: state.messagePopup.get('content'),
			popupShow: state.messagePopup.get('popupShow'),
		};
	}, {
		hideMessagePopup
	}
)(MessagePopup);