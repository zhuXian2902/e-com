/** @format */

import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Box } from '@material-ui/core';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import {
	Formik,
	Form,
	Field,
	ErrorMessage,
	setNestedObjectValues,
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SimpleFileUpload, Select } from 'formik-material-ui';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export default function AddressForm({ valid, setValid, values, setValues }) {
	const initialValues = {
		firstName: '',
		lastName: '',
		address: '',
		city: '',
		zip: '',
		country: '',
		state: '',
	};

	const validationSchema = Yup.object({
		firstName: Yup.string().required('Required'),
		lastName: Yup.string().required('Required'),
		address: Yup.string().required('Required'),
		city: Yup.string('').required('Required'),
		zip: Yup.string().required('Required'),
		country: Yup.string().required('Required'),
		state: Yup.string().required('Required'),
	});

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Shipping address
			</Typography>
			<Formik
				initialValues={initialValues}
				// onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				{(props) => {
					const {
						values,
						isSubmitting,
						isValid,
						errors,
						touched,
						handleBlur,
						handleChange,
						setFieldValue,
						handleSubmit,
					} = props;
					setValues(values);
					setValid(isValid);
					return (
						<Form>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={6}>
									<TextField
										name="firstName"
										label="First name"
										fullWidth
										autoFocus
										autoComplete="given-name"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.firstName}
										helperText={errors.firstName && touched.firstName && errors.firstName}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										name="lastName"
										label="Last name"
										fullWidth
										autoComplete="family-name"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.lastName}
										helperText={errors.lastName && touched.lastName && errors.lastName}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										name="address"
										label="Address line"
										fullWidth
										autoComplete="shipping address-line"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.address}
										helperText={errors.address && touched.address && errors.address}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										name="city"
										label="City"
										fullWidth
										autoComplete="shipping address-level2"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.city}
										helperText={errors.city && touched.city && errors.city}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										name="state"
										label="State/Province/Region"
										fullWidth
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.state}
										helperText={errors.state && touched.state && errors.state}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										name="zip"
										label="Zip / Postal code"
										fullWidth
										autoComplete="shipping postal-code"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.zip}
										helperText={errors.zip && touched.zip && errors.zip}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										name="country"
										label="Country"
										fullWidth
										autoComplete="shipping country"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.country}
										helperText={errors.country && touched.country && errors.country}
									/>
								</Grid>
							</Grid>
						</Form>
					);
				}}
			</Formik>
		</React.Fragment>
	);
}
