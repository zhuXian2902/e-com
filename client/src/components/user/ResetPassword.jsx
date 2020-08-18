/** @format */

import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField } from 'formik-material-ui';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from './../Product/Header';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';
import { authenticate, isAuth } from './../../utils/helpers';
import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
	alert: {
		margin: theme.spacing(0),
	},
	paper: {
		marginTop: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		marginTop: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const initialValues = {
	passwordConfirm: '',
	password: '',
};

const validationSchema = Yup.object({
	password: Yup.string('')
		.min(8, 'Password must contain at least 8 characters')
		.required('Required'),
	passwordConfirm: Yup.string()
		.required('Required')
		.oneOf([Yup.ref('password')], 'Password does not match'),
});

export default function ResetPassword(props) {
	const classes = useStyles();
	const { match } = props;

	const [token, setToken] = useState('');
	const [buttonText, setButtonText] = useState(false);
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);

	const user = isAuth();

	useEffect(() => {
		let token = match.params.token;

		if (token) {
			setToken(token);
		}
	}, [match.params.token]);

	const onSubmit = async (values, submitProps) => {
		try {
			submitProps.setSubmitting(false);
			setButtonText(true);
			const { password, passwordConfirm } = values;

			const res = await axios.post(`/users/resetPassword`, {
				token,
				password,
				passwordConfirm,
			});

			setButtonText(true);
			submitProps.resetForm();
			toast.success(
				'Password changed successfully. Please Login with your new password',
				{
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
				}
			);
			setButtonText(false);
			setRedirectToReferrer(true);
		} catch (err) {
			if (err && err.response && err.response.data) {
				console.log(err.response);
				toast.error(err.response.data.message, {
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else {
				toast.error('server is not running', {
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
			setButtonText(false);
		}
	};

	if (redirectToReferrer) {
		return <Redirect to="/" />;
	}

	return (
		<div>
			<Header />
			<Container component="main" maxWidth="sm">
				<ToastContainer
					position="top-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss={false}
					draggable={false}
					pauseOnHover={false}
				/>
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Reset Password
					</Typography>
					<Formik
						initialValues={initialValues}
						onSubmit={onSubmit}
						validationSchema={validationSchema}
					>
						{(props) => {
							const { submitForm, isSubmitting, isValid } = props;

							return (
								<Form className={classes.form}>
									<Grid container spacing={2}>
										<Grid item xs={12}>
											<Field
												fullWidth
												variant="outlined"
												component={TextField}
												type="password"
												label="Password"
												name="password"
											/>
										</Grid>
										<Grid item xs={12}>
											<Field
												fullWidth
												variant="outlined"
												component={TextField}
												type="password"
												label="Confirm Password"
												name="passwordConfirm"
											/>
										</Grid>
									</Grid>

									<Button
										fullWidth
										variant="contained"
										color="primary"
										className={classes.submit}
										disabled={!isValid || buttonText}
										type="submit"
									>
										{buttonText ? (
											<CircularProgress size={24} color="secondary" />
										) : (
											'Submit'
										)}
									</Button>
								</Form>
							);
						}}
					</Formik>
				</div>
			</Container>
		</div>
	);
}
