import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Form, FormGroup, FormControl, Button, Col, Alert, ButtonToolbar } from 'react-bootstrap';
import { hideAuthPopup, checkLogIn, changeFieldInput } from '../AC/authPopup';

class AuthPopup extends Component {

	static propTypes = {
		isLogIn: PropTypes.bool.isRequired,
		authPopupShow: PropTypes.bool.isRequired,
		checkLogIn: PropTypes.func.isRequired,
		hideAuthPopup: PropTypes.func.isRequired,
		authFailure: PropTypes.bool.isRequired,
		user: PropTypes.object.isRequired,
		changeFieldInput: PropTypes.func.isRequired
	};

	closeAuthPopupHandler = () => {
		this.props.hideAuthPopup();
	};

	inputFieldOnChangeHandler = (e) => {
		this.props.changeFieldInput(e.target.name, e.target.value);
	};

	checkLogInHandler = () => {
		this.props.checkLogIn();
	};

	render () {
		const { authPopupShow } = this.props;
		const { user } = this.props;

		const { authFailure } = this.props;
		const login = user.get('login') || '';
		const password = user.get('password') || '';
		const authFailureMessage = authFailure ? (<Alert bsStyle="danger" className="i2l-auth-failure-alert">{'Authentication Failure. The Login or Password is incorrect.'}</Alert>) : null;

		return authPopupShow ?
			<Modal.Dialog>
				<Modal.Header>
					<Modal.Title>Please, Sign In</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form horizontal onSubmit={this.checkLogInHandler} className="i2l-login-form">

						{authFailureMessage}

						<FormGroup>
							<Col sm={3}>
								Login
							</Col>
							<Col sm={9}>
								<FormControl type="text" placeholder="Login" name="login" value={login} onChange={this.inputFieldOnChangeHandler} className="i2l-login-field" />
							</Col>
						</FormGroup>

						<FormGroup>
							<Col sm={3}>
								Password
							</Col>
							<Col sm={9}>
								<FormControl type="password" placeholder="Password" name="password" value={password} onChange={this.inputFieldOnChangeHandler} />
							</Col>
						</FormGroup>

						<FormGroup>
							<Col smOffset={3} sm={9}>
								<ButtonToolbar>
									<Button bsStyle="success" type="submit">
										Sign in
									</Button>
									<Button onClick={() => this.closeAuthPopupHandler()} bsStyle="danger">
										Close
									</Button>
								</ButtonToolbar>
							</Col>
						</FormGroup>

					</Form>
				</Modal.Body>
			</Modal.Dialog>
			: null;
	}
}

export default connect(
	(state) => {
		return {
			isLogIn: state.authPopup.get('isLogIn'),
			authPopupShow: state.authPopup.get('authPopupShow'),
			authFailure: state.authPopup.get('authFailure'),
			user: state.authPopup.get('user')
		};
	}, {
		hideAuthPopup,
		checkLogIn,
		changeFieldInput
	}
)(AuthPopup);