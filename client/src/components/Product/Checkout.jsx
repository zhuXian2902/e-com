/** @format */

import React, { useState, useEffect } from 'react';
import { isAuth, getCookie } from './../../utils/helpers';
import { totalItems, getCartItems, emptyCart } from './../../utils/cartHelpers';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
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

const useStyles = makeStyles(({ palette, breakpoints }) => ({
	btn: {
		width: '100%',
		paddingTop: 12,
		paddingBottom: 12,
		borderRadius: 40,
		border: '1px solid',
		borderColor: palette.grey[400],
		'& > *': {
			fontWeight: 'bold',
			textTransform: 'none',
		},
		backgroundColor: '#fff',
		'&:hover': {
			textDecoration: 'none',
		},
	},
}));

const Checkout = ({ total, isChange, setChange }) => {
	const [clientToken, setClientToken] = useState(null);
	const [instance, setInstance] = useState({});
	const [address, setAddress] = useState();
	const [open, setOpen] = React.useState(false);
	const styles = useStyles();
	// const id = isAuth() && isAuth().user._id;
	// const token = getCookie('token');

	const getToken = async () => {
		try {
			const res = await axios.get(`/orders/braintree/gettoken`);

			setClientToken(res.data.clientToken);
		} catch (err) {
			if (err && err.response && err.response.data) {
				toast.error(err.response.data.message, toastOptions);
			} else {
				toast.error('server is not running', toastOptions);
			}
		}
	};

	const buy = async () => {
		try {
			// Send the nonce to your server
			const amount = getCartItems()[1];
			const { nonce } = await instance.requestPaymentMethod();
			const data = { amount, nonce };
			setOpen(true);
			const response = await axios.post('orders/braintree/payment', data);

			const orderData = {
				products: getCartItems()[0],
				itemCount: getCartItems()[1],
				address: address,
				amount: response.data.transaction.amount,
				transactionId: response.data.transaction.id,
			};

			const order = await axios.post('/orders', orderData);
			emptyCart(() => {
				toast.success('your payment has been successfully completed', toastOptions);
				setOpen(false);
				setChange(!isChange);
			});
		} catch (err) {
			if (err && err.response && err.response.data) {
				toast.error(err.response.data.message, toastOptions);
			}
			setOpen(false);
		}
	};

	useEffect(() => {
		getToken();
	}, []);

	return (
		<div>
			<TextField
				style={{ backgroundColor: '#fff' }}
				multiline
				rows="3"
				fullWidth
				variant="outlined"
				label="address"
				name="address"
				value={address}
				onChange={(e) => setAddress(e.target.value)}
			/>
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
			{isAuth() ? (
				<Button onClick={buy} className={styles.btn}>
					Checkout
				</Button>
			) : (
				// <Redirect to="/signin" />
				<Link to="/signin">
					<Button className={styles.btn}>login to checkout</Button>
				</Link>
			)}
		</div>
	);
};

export default Checkout;
