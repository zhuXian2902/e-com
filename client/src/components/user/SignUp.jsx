/** @format */

import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { NavLink as RouterLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import Header from './../Product/Header';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField } from 'formik-material-ui';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

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
	error: {
		color: 'red',
	},
}));

const initialValues = {
	name: 'abc',
	email: 'abc@example.com',
	password: '123456789',
	passwordConfirm: '123456789',
};

const validationSchema = Yup.object({
	name: Yup.string().required('Required'),
	email: Yup.string().email('Enter a valid email').required('Required'),
	password: Yup.string('')
		.min(8, 'Password must contain at least 8 characters')
		.required('Required'),
	passwordConfirm: Yup.string()
		.required('Required')
		.oneOf([Yup.ref('password')], 'Password does not match')
		.required('Required'),
});

export default function SignUp(props) {
	const classes = useStyles();
	const [buttonText, setButtonText] = useState(false);

	const onSubmit = async (values, submitProps) => {
		try {
			console.log(submitProps.isSubmitting);
			submitProps.setSubmitting(false);
			setButtonText(true);
			const { name, email, password, passwordConfirm } = values;

			const res = await axios.post(`/users/signup`, {
				name,
				email,
				password,
				passwordConfirm,
			});
			console.log(res);
			console.log(submitProps.isSubmitting);
			submitProps.resetForm();
			toast.success(res.data.message, {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
			});
			submitProps.resetForm();
			setButtonText(false);
		} catch (err) {
			if (err && err.response && err.response.data) {
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

	console.log(initialValues);

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
						Sign up
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
												component={TextField}
												label="Name"
												name="name"
												autoComplete="name"
												variant="outlined"
												fullWidth
												autoFocus
											/>
										</Grid>

										<Grid item xs={12}>
											<Field
												component={TextField}
												variant="outlined"
												fullWidth
												label="Email Address"
												name="email"
												autoComplete="email"
											/>
										</Grid>
										<Grid item xs={12}>
											<Field
												variant="outlined"
												fullWidth
												name="password"
												label="Password"
												type="password"
												component={TextField}
												autoComplete="current-password"
											/>
										</Grid>
										<Grid item xs={12}>
											<Field
												component={TextField}
												variant="outlined"
												fullWidth
												name="passwordConfirm"
												label="Password Confirm"
												type="password"
												autoComplete="off"
											/>
										</Grid>
										<Grid item xs={12}>
											<FormControlLabel
												control={<Checkbox value="allowExtraEmails" color="primary" />}
												label="I agree with all the terms."
											/>
										</Grid>
									</Grid>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										className={classes.submit}
										disabled={!isValid || buttonText}
									>
										{buttonText ? (
											<CircularProgress size={24} color="secondary" />
										) : (
											'Submit'
										)}
									</Button>
									<Grid container justify="flex-end">
										<Grid item>
											<Link component={RouterLink} to="/signin" variant="body2">
												Already have an account? Sign in
											</Link>
										</Grid>
									</Grid>
								</Form>
							);
						}}
					</Formik>
				</div>
			</Container>
		</div>
	);
}
