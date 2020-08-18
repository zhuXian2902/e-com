/** @format */

import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, Redirect } from 'react-router-dom';
import Loading from './Loading';
import { isAuth, getCookie } from './../../utils/helpers';
import { totalItems, getCartItems, emptyCart } from './../../utils/cartHelpers';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';

const toastOptions = {
	position: 'top-center',
	autoClose: 5000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: false,
	draggable: false,
	progress: undefined,
};

export default function PaymentForm({
	setInstance,
	instance,
	buy,
	open,
	setOpen,
}) {
	const [clientToken, setClientToken] = useState(null);
	// const [instance, setInstance] = useState({});
	// const [address, setAddress] = useState();
	// const [open, setOpen] = React.useState(false);

	const getToken = async () => {
		try {
			setOpen(true);
			const res = await axios.get(`/orders/braintree/gettoken`);

			setClientToken(res.data.clientToken);
			setOpen(false);
		} catch (err) {
			if (err && err.response && err.response.data) {
				toast.error(err.response.data.message, toastOptions);
			} else {
				toast.error('server is not running', toastOptions);
			}
		}
	};

	// const buy = async () => {
	// 	try {
	// 		// Send the nonce to your server
	// 		const amount = getCartItems()[1];
	// 		const { nonce } = await instance.requestPaymentMethod();
	// 		const data = { amount, nonce };
	// 		setOpen(true);
	// 		const response = await axios.post('orders/braintree/payment', data);

	// 		const orderData = {
	// 			products: getCartItems()[0],
	// 			itemCount: getCartItems()[1],
	// 			address: address,
	// 			amount: response.data.transaction.amount,
	// 			transactionId: response.data.transaction.id,
	// 		};

	// 		const order = await axios.post('/orders', orderData);
	// 		emptyCart(() => {
	// 			toast.success(
	// 				'your payment has been successfully completed.a confirmation mail is sent to your mail.',
	// 				toastOptions
	// 			);
	// 			setOpen(false);
	// 			// setChange(!isChange);
	// 		});
	// 	} catch (err) {
	// 		if (err && err.response && err.response.data) {
	// 			toast.error(err.response.data.message, toastOptions);
	// 		}
	// 		setOpen(false);
	// 	}
	// };

	useEffect(() => {
		getToken();
	}, []);

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Payment method
			</Typography>

			<div>
				<Loading open={open} />
				{clientToken && totalItems() > 0 && (
					<DropIn
						style={{ margin: 0 }}
						options={{
							authorization: clientToken,
							// paypal: {
							// 	flow: 'vault',
							// },
						}}
						onInstance={(instance) => setInstance(instance)}
					/>
				)}
			</div>
		</React.Fragment>
	);
}
