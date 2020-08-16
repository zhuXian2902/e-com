/** @format */

import React, { useState } from 'react';
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
	dis: {
		display: 'flex',
		justifyContent: 'space-between',
	},
}));

const initialValues = {
	currentPassword: '',
	password: '',
	passwordConfirm: '',
};

const validationSchema = Yup.object({
	currentPassword: Yup.string().required('Required'),
	password: Yup.string('').required('Required'),
	passwordConfirm: Yup.string('')
		.required('Required')
		.oneOf([Yup.ref('password')], 'Password does not match'),
});

export default function SignIn(props) {
	const classes = useStyles();
	const [buttonText, setButtonText] = useState(false);
	const user = isAuth();
	const onSubmit = async (values, submitProps) => {
		try {
			submitProps.setSubmitting(false);
			setButtonText(true);
			const { currentPassword, password, passwordConfirm } = values;
			const res = await axios.patch(`/users/updatePassword`, {
				currentPassword,
				password,
				passwordConfirm,
			});
			authenticate(res, () => {
				setButtonText(true);
				submitProps.resetForm();
				toast.success('Password changed successfully', {
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
				});
				setButtonText(false);
			});
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

	// if (redirectToReferrer) {
	// 	if (user.role === 'user') return <Redirect to="/userdashboard" />;
	// 	else return <Redirect to="/admindashboard" />;
	// 	if (isAuth()) return <Redirect to="/" />;
	// }

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
					<Typography component="h1" variant="h5">
						Update Password
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
										<Grid className={classes.dis} item xs={12}>
											<span>Current Password</span>
											<span>
												<Field
													fullWidth
													autoFocus
													variant="outlined"
													component={TextField}
													name="currentPassword"
													type="Password"
													label="Current Password"
												/>
											</span>
										</Grid>
										<Grid className={classes.dis} item xs={12}>
											<span>New Password</span>
											<span>
												<Field
													fullWidth
													variant="outlined"
													component={TextField}
													type="password"
													label="New Password"
													name="password"
												/>
											</span>
										</Grid>
										<Grid className={classes.dis} item xs={12}>
											<span>Confirm Password</span>
											<span>
												<Field
													fullWidth
													variant="outlined"
													component={TextField}
													type="password"
													label="Confirm Password"
													name="passwordConfirm"
												/>
											</span>
										</Grid>
									</Grid>

									<Button
										variant="contained"
										color="primary"
										className={classes.submit}
										disabled={!isValid || buttonText}
										type="submit"
									>
										{buttonText ? (
											<CircularProgress size={24} color="secondary" />
										) : (
											'save changes'
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
