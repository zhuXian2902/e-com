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
import Loading from './../Product/Loading';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';

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
	name: '',
	description: '',
	quantity: '',
	price: '',
	category: '',
	image: '',
	categoryName: '',
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

function UpdateProduct({ setChange, change, open, id, handleClose }) {
	// console.log(id, open);
	const classes = useStyles();
	const [categories, setCategories] = useState();
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(false);
	// const [file, setFile] = useState();
	const [buttonText, setButtonText] = useState(false);
	const [render, setRender] = useState(false);

	const getCategories = async () => {
		try {
			const res = await axios.get('/category');
			setCategories(res.data.data);
		} catch (err) {
			if (err && err.response && err.response.data) {
				toast.error(err.response.data.message, toastOptions);
			} else {
				toast.error('server is not running', toastOptions);
			}
		}
	};

	const getProduct = async (id) => {
		try {
			setLoading(true);
			const res = await axios.get(`/products/${id}`);
			setLoading(false);
			const data = res.data.data;
			setProduct(data);
			initialValues.name = data.name;
			initialValues.description = data.description;
			initialValues.price = data.price;
			initialValues.quantity = data.quantity;
			initialValues.category = data.category._id;
			initialValues.image = data.image;
			initialValues.categoryName = data.category.name;
			if (initialValues.name) setRender(true);
		} catch (err) {
			if (err && err.response && err.response.data) {
				toast.error(err.response.data.message, toastOptions);
			} else {
				toast.error('server is not running', toastOptions);
			}
			setLoading(false);
		}
	};

	useEffect(() => {
		getCategories();
		getProduct(id);
	}, [render]);

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
			setLoading(true);
			const res = await axios.patch(`/products/${id}`, formData);
			setLoading(false);
			setButtonText(true);
			toast.success('Product successfully created', toastOptions);
			submitProps.resetForm();
			setButtonText(false);
			handleClose();
			setChange(!change);
		} catch (err) {
			if (err && err.response && err.response.data) {
				toast.error(err.response.data.message, toastOptions);
			} else {
				toast.error('server is not running', toastOptions);
			}
			setButtonText(false);
			setLoading(false);
		}
	};

	return (
		<>
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
							Update Product
						</Typography>
					</Toolbar>
				</AppBar>
				<ToastContainer {...toastOptions} />
				<Loading open={loading} />

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
													<option value={initialValues.category}>
														{initialValues.categoryName}
													</option>
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
			</Dialog>
		</>
	);
}

export default UpdateProduct;
