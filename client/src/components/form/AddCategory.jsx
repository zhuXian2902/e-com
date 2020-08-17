/** @format */
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';
import { authenticate, isAuth, getCookie } from './../../utils/helpers';

const useStyles = makeStyles((theme) => ({
	heading: {
		flexBasis: '75%',
	},
	secondaryHeading: {
		color: theme.palette.text.secondary,
	},
	form: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(1, 0, 1),
	},
}));

const initialValues = {
	name: '',
};

const validationSchema = Yup.object({
	name: Yup.string('').required('Required'),
});

function AddCategory() {
	const classes = useStyles();
	const [buttonText, setButtonText] = useState(false);
	const jwttoken = getCookie('token');

	const onSubmit = async (values, submitProps) => {
		try {
			submitProps.setSubmitting(false);
			setButtonText(true);
			const { name } = values;

			const res = await axios.post(`/category`, { name });

			setButtonText(true);
			submitProps.resetForm();
			toast.success('category successfully created', {
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
		<>
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

			<Typography component="div" className={classes.heading}>
				<Box fontSize={30}>Add New Category</Box>
			</Typography>

			<AccordionDetails>
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{(props) => {
						const { isSubmitting, isValid } = props;

						return (
							<Form className={classes.form}>
								<Field
									autoFocus
									variant="outlined"
									component={TextField}
									name="name"
									label="Category"
								/>

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
										'Submit'
									)}
								</Button>
							</Form>
						);
					}}
				</Formik>
			</AccordionDetails>
		</>
	);
}

export default AddCategory;
