/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { NavLink as RouterLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField } from 'formik-material-ui';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SimpleFileUpload, Select } from 'formik-material-ui';
import { updateUser } from './../../utils/helpers';
import { deepOrange } from '@material-ui/core/colors';
import Header from './../Product/Header';

const useStyles = makeStyles((theme) => ({
	alert: {
		margin: theme.spacing(0),
	},
	paper: {
		marginTop: theme.spacing(0),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	dis: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	large: {
		width: theme.spacing(12),
		height: theme.spacing(12),
	},
	orange: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
		width: theme.spacing(12),
		height: theme.spacing(12),
		fontSize: '80px',
	},
}));

const initialValues = {
	name: '',
	email: '',
	address: '',
	image: '',
};

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const validationSchema = Yup.object({
	name: Yup.string().required('Required'),
	email: Yup.string().email('Enter a valid email').required('Required'),
	// address: Yup.string('').required('Required'),
	image: Yup.mixed(),
	// .required('A file is required')
	// .test(
	// 	'fileSize',
	// 	'File too large',
	// 	(value) => value && value.size <= FILE_SIZE
	// )
	// .test(
	// 	'fileFormat',
	// 	'Unsupported Format',
	// 	(value) => value && SUPPORTED_FORMATS.includes(value.type)
	// ),
});

export default function SignUp(props) {
	const classes = useStyles();
	const [buttonText, setButtonText] = useState(false);
	const [user, setUser] = useState({});
	const imageUrl = process.env.REACT_APP_SERVER_IMAGE_URL;
	const url = `${imageUrl}/users/`;

	const getInfo = async () => {
		try {
			const data = await axios.get('/users/profile');
			const userData = data.data.data.data;
			initialValues.name = userData.name;
			initialValues.email = userData.email;
			initialValues.image = userData.image;
			initialValues.address = userData.address;
			setUser(data.data.data);
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
			}
		}
	};

	useEffect(() => {
		getInfo();
	}, [buttonText]);

	const onSubmit = async (values, submitProps) => {
		try {
			let formData = new FormData();

			formData.append('name', values.name);
			formData.append('email', values.email);
			formData.append('address', values.address);
			formData.append('image', values.image);
			submitProps.setSubmitting(false);
			setButtonText(true);
			console.log(formData.get('name'), formData.get('image'));
			const { name, email, address, image } = values;

			const res = await axios.patch(`/users/updateProfile`, formData);
			const data = res.data;
			updateUser(data, () => {
				toast.success('Profile updated succesfully', {
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
						Update Profile
					</Typography>
					<Formik
						initialValues={initialValues}
						onSubmit={onSubmit}
						validationSchema={validationSchema}
					>
						{(props) => {
							const {
								submitForm,
								isSubmitting,
								isValid,
								setFieldValue,
								touched,
								errorMessage,
							} = props;

							return (
								<Form className={classes.form}>
									<Grid container spacing={2}>
										<Grid className={classes.dis} item xs={12}>
											<span>Name</span>
											<span>
												<Field
													component={TextField}
													label="Name"
													name="name"
													autoComplete="name"
													variant="outlined"
													autoFocus
												/>
											</span>
										</Grid>

										<Grid className={classes.dis} item xs={12}>
											<span>Email</span>
											<span>
												<Field
													component={TextField}
													variant="outlined"
													label="Email Address"
													name="email"
													disabled
												/>
											</span>
										</Grid>
										<Grid item xs={12}>
											<span>Address</span>
											<Field
												variant="outlined"
												fullWidth
												name="address"
												label="Address"
												component={TextField}
												multiline
												rows="3"
											/>
										</Grid>
										<Grid item xs={12}>
											<span>
												<Avatar
													// className={classes.large}
													className={classes.orange}
													alt={initialValues.name}
													src={`${url}/${initialValues.image}`}
												/>
											</span>
											<span>
												<Field
													className={classes.image}
													fullWidth
													component={SimpleFileUpload}
													error={touched && errorMessage ? true : false}
													helperText={touched && errorMessage ? errorMessage : undefined}
													style={{ textDecoration: 'none', backgroundColor: 'red' }}
													name="image"
													label="User Image"
													// setFieldValue={initialValues.image}
													onChange={(event) => {
														setFieldValue('image', event.currentTarget.files[0]);
													}}
												/>
											</span>
										</Grid>
									</Grid>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										className={classes.submit}
										disabled={buttonText}
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
