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
}));

const initialValues = {
	email: '',
};

const validationSchema = Yup.object({
	email: Yup.string().email('Enter a valid email').required('Required'),
});

export default function ForgotPassword(props) {
	const classes = useStyles();

	const [buttonText, setButtonText] = useState(false);
	const onSubmit = async (values, submitProps) => {
		try {
			setButtonText(true);
			const { email } = values;

			const res = await axios.post(`/users/forgotPassword`, {
				email,
			});

			setButtonText(true);
			submitProps.resetForm();
			toast.success('A password reset link is send to your account.', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
			});
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
						Forgot Password
					</Typography>
					<Formik
						initialValues={initialValues}
						onSubmit={onSubmit}
						validationSchema={validationSchema}
					>
						{(props) => {
							const { submitForm, isValid } = props;

							return (
								<Form className={classes.form}>
									<Grid container spacing={2}>
										<Grid item xs={12}>
											<Field
												fullWidth
												variant="outlined"
												component={TextField}
												name="email"
												type="email"
												label="Email"
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
