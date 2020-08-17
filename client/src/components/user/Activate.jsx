/** @format */

import React, { useState, useEffect } from 'react';
import Header from '../Product/Header';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';
import { authenticate, isAuth } from './../../utils/helpers';

const Activate = ({ match }) => {
	const [values, setValues] = useState({
		name: '',
		token: '',
		show: true,
	});

	const [buttonText, setButtonText] = useState(false);
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);

	useEffect(() => {
		let token = match.params.token;

		if (token) {
			let { name } = jwt.decode(token);
			setValues((v) => ({ ...v, name, token }));
		}
	}, [match.params.token]);

	const { name, token } = values;

	const Submit = async (event) => {
		try {
			event.preventDefault();
			setButtonText(true);
			const res = await axios.post('/users/authenticate', { token });
			authenticate(res, () => {
				setButtonText(false);

				setValues({ ...values, show: false });
				toast.success(res.data.message, {
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				setRedirectToReferrer(true);
			});
		} catch (err) {
			toast.error(err.response.data.message, {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			setButtonText(false);
		}
	};

	const activationLink = () => (
		<div className="text-center">
			<h1 className="p-5">Hey {name}, Ready to activate your account?</h1>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				// className={classes.submit}
				onClick={Submit}
				disabled={buttonText}
			>
				{buttonText ? <CircularProgress size={24} color="secondary" /> : 'Submit'}
			</Button>
		</div>
	);

	if (redirectToReferrer) {
		return <Redirect to="/" />;
	}

	return (
		<Header>
			<div className="col-md-6 offset-md-3">
				<ToastContainer />
				{activationLink()}
			</div>
		</Header>
	);
};

export default Activate;
