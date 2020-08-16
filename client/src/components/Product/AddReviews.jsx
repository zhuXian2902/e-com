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
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

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
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const initialValues = {
	review: '',
};

const validationSchema = Yup.object({
	review: Yup.string().required('Required'),
});

export default function SignIn({ change, setChange, id, handleClose, open }) {
	const classes = useStyles();

	const [buttonText, setButtonText] = useState(false);
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);
	const [rating, setRating] = React.useState(2);

	const user = isAuth();
	const onSubmit = async (values, submitProps) => {
		try {
			setButtonText(true);
			const { review } = values;
			console.log(review, rating);
			const res = await axios.post(`/products/${id}/reviews`, {
				rating,
				review,
			});
			setButtonText(true);
			submitProps.resetForm();
			toast.success('Review created successfully', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
			});
			setButtonText(false);
			setChange(!change);
			handleClose();
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
	// console.log(initialValues, rating);

	return (
		<div>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Create Review
						</Typography>
					</Toolbar>
				</AppBar>
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
											<Box component="fieldset" mb={3} borderColor="transparent">
												<Typography component="legend">Customer Rating</Typography>
												<Rating
													name="rating"
													value={rating}
													onChange={(event, newValue) => {
														setRating(newValue);
													}}
													precision={1}
													size="large"
												/>
											</Box>

											<Grid item xs={12}>
												<Field
													fullWidth
													multiline
													rows="4"
													variant="outlined"
													component={TextField}
													label="Write Your Review"
													name="review"
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
			</Dialog>
		</div>
	);
}
