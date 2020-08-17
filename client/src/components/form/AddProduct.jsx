/** @format */
import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Box } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';
import { authenticate } from './../../utils/helpers';
import { SimpleFileUpload, Select } from 'formik-material-ui';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
	heading: {
		flexBasis: '75%',
	},
	secondaryHeading: {
		color: theme.palette.text.secondary,
	},
	image: {
		textDecoration: 'none',
		color: theme.palette.text.secondary,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(1, 0, 1),
	},
	area: {
		width: '100%',
	},
	col: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

const initialValues = {
	name: '',
	description: '',
	quantity: '',
	price: '',
	category: '',
	image: '',
};

// const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const validationSchema = yup.object().shape({
	category: yup.string('').required('Required'),
	name: yup.string('').required('Required'),
	description: yup.string('').required('Required'),
	quantity: yup
		.number()
		.required('Required')
		.positive('quantity should be positive.')
		.integer('Inegers only'),
	price: yup
		.number()
		.required('Required')
		.positive('price should be positive.')
		.integer('Inegers only'),
	image: yup
		.mixed()
		.required('A file is required')
		// .test(
		// 	'fileSize',
		// 	'File too large',
		// 	(value) => value && value.size <= FILE_SIZE
		// )
		.test(
			'fileFormat',
			'Unsupported Format',
			(value) => value && SUPPORTED_FORMATS.includes(value.type)
		),
});

const toastOptions = {
	position: 'top-center',
	autoClose: 5000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: false,
	draggable: false,
	progress: undefined,
};

function AddProduct() {
	const classes = useStyles();
	const [categories, setCategories] = useState();
	// const [file, setFile] = useState();
	const [buttonText, setButtonText] = useState(false);

	const getCategories = async () => {
		try {
			const res = await axios.get('/category');
			setCategories(res.data.data);
			// console.log(categories, res.data.data);
		} catch (err) {
			if (err && err.response && err.response.data) {
				toast.error(err.response.data.message, toastOptions);
			} else {
				toast.error('server is not running', toastOptions);
			}
		}
	};

	useEffect(() => {
		getCategories();
	}, []);

	const onSubmit = async (values, submitProps) => {
		try {
			let formData = new FormData();

			formData.append('name', values.name);
			formData.append('description', values.description);
			formData.append('price', values.price);
			formData.append('quantity', values.quantity);
			formData.append('category', values.category);
			formData.append('image', values.image);
			// console.log(formData.get('name'), formData.get('image'));
			submitProps.setSubmitting(false);
			setButtonText(true);

			const res = await axios.post(`/products`, formData);

			setButtonText(true);
			submitProps.resetForm();
			toast.success('Product successfully created');
			setButtonText(false);
		} catch (err) {
			if (err && err.response && err.response.data) {
				toast.error(err.response.data.message, toastOptions);
			} else {
				toast.error('server is not running', toastOptions);
			}
			setButtonText(false);
		}
	};

	return (
		<>
			<ToastContainer {...toastOptions} />

			<Typography component="div" className={classes.heading}>
				<Box fontSize={30}>Add New Product</Box>
			</Typography>

			<AccordionDetails>
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{(props) => {
						const {
							isSubmitting,
							isValid,
							errors,
							touched,
							handleChange,
							handleBlur,
							setFieldValue,
						} = props;

						return (
							<Form className={classes.form}>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<Field
											className={classes.image}
											fullWidth
											component={SimpleFileUpload}
											style={{ textDecoration: 'none', backgroundColor: 'red' }}
											name="image"
											label="Product Image Upload"
											onChange={(event) => {
												setFieldValue('image', event.currentTarget.files[0]);
											}}
										/>
									</Grid>
									<Grid item xs={12}>
										<Field
											component={TextField}
											label="Product Name"
											name="name"
											autoComplete="name"
											variant="outlined"
											fullWidth
											autoFocus
										/>
									</Grid>

									<Grid item xs={12}>
										<Field
											margin="normal"
											multiline
											rows="4"
											fullWidth
											component={TextField}
											variant="outlined"
											label="Description"
											name="description"
										/>
									</Grid>
									<Grid item xs={12} className={classes.col}>
										<Field
											variant="outlined"
											name="price"
											label="Price"
											component={TextField}
										/>

										<FormControl variant="outlined" className={classes.formControl}>
											<InputLabel htmlFor="age-simple">Category</InputLabel>
											<Field native component={Select} name="category">
												<option aria-label="None" value="" />
												{categories &&
													categories.map((val, index) => (
														<option key={val._id} value={val._id}>
															{val.name}
														</option>
													))}
											</Field>
										</FormControl>

										<Field
											component={TextField}
											variant="outlined"
											name="quantity"
											label="Qunatity"
											autoComplete="off"
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
							</Form>
						);
					}}
				</Formik>
			</AccordionDetails>
		</>
	);
}

export default AddProduct;
