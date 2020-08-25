/** @format */

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Address from './../form/Address';
import Payment from './Payment';
import ReviewOrder from './ReviewOrder';
import { isAuth, getCookie } from './../../utils/helpers';
import { Redirect } from 'react-router-dom';
import { totalItems, getCartItems, emptyCart } from './../../utils/cartHelpers';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import Loading from './Loading';

const toastOptions = {
	position: 'top-center',
	autoClose: 5000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: false,
	draggable: false,
	progress: undefined,
};

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
			width: 800,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	stepper: {
		padding: theme.spacing(3, 0, 5),
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
}));

const steps = ['Shipping address', 'Review your order', 'Payment details'];

export default function Checkout() {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);

	const [values, setValues] = React.useState({
		firstName: '',
		lastName: '',
		address: '',
		city: '',
		zip: '',
		country: '',
		state: '',
	});
	const [valid, setValid] = React.useState(false);

	const [instance, setInstance] = useState({});
	const [open, setOpen] = React.useState(false);
	const [order, setOrder] = useState('');

	function getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<Address
						values={values}
						valid={valid}
						setValid={setValid}
						setValues={setValues}
					/>
				);
			case 1:
				return <ReviewOrder values={values} />;
			case 2:
				return (
					<Payment
						setInstance={setInstance}
						instance={instance}
						open={open}
						setOpen={setOpen}
					/>
				);
			default:
				throw new Error('Unknown step');
		}
	}

	const buy = async () => {
		try {
			// Send the nonce to your server
			const addresses = [
				values.firstName,
				values.lastName,
				values.address,
				values.city,
				values.state,
				values.zip,
				values.country,
			];
			const amount = getCartItems()[1];
			const { nonce } = await instance.requestPaymentMethod();
			const data = { amount, nonce };
			setOpen(true);
			const response = await axios.post('orders/braintree/payment', data);

			const orderData = {
				products: getCartItems()[0],
				itemCount: getCartItems()[1],
				address: addresses.join(', '),
				amount: response.data.transaction.amount,
				transactionId: response.data.transaction.id,
			};

			const order = await axios.post('/orders', orderData);
			setOrder(order.data.order._id);
			emptyCart(() => {
				setOpen(false);
				// setChange(!isChange);
				setActiveStep(activeStep + 1);
			});
		} catch (err) {
			if (err && err.response && err.response.data) {
				toast.error(err.response.data.message, toastOptions);
			}
			setOpen(false);
		}
	};

	const handleNext = async (e) => {
		if (activeStep === 2) {
			await buy();
		} else {
			setActiveStep(activeStep + 1);
		}
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	return (
		<React.Fragment>
			{!isAuth() && <Redirect to="/signin" />}
			<CssBaseline />
			<Header />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h4" align="center">
						Checkout
					</Typography>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<React.Fragment>
						{activeStep === steps.length ? (
							<React.Fragment>
								<Typography variant="h5" gutterBottom>
									Thank you for your order.
								</Typography>
								<Typography variant="subtitle1">
									Your order number is {order}. We have emailed your order confirmation,
									and will send you an update when your order has shipped.
								</Typography>
							</React.Fragment>
						) : (
							<React.Fragment>
								{getStepContent(activeStep)}
								<div className={classes.buttons}>
									{activeStep !== 0 && (
										<Button onClick={handleBack} className={classes.button}>
											Back
										</Button>
									)}
									<Button
										variant="contained"
										color="primary"
										onClick={(e) => handleNext(e)}
										className={classes.button}
										disabled={!valid}
									>
										{activeStep === steps.length - 1 ? 'Place order' : 'Next'}
									</Button>
								</div>
							</React.Fragment>
						)}
					</React.Fragment>
				</Paper>
			</main>
		</React.Fragment>
	);
}
