/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { Typography, Box } from '@material-ui/core';

const Accordion = withStyles({
	root: {
		border: '1px solid rgba(0, 0, 0, .125)',
		boxShadow: 'none',
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
		'&$expanded': {
			margin: 'auto',
		},
	},
	expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
	root: {
		backgroundColor: 'rgba(0, 0, 0, .03)',
		borderBottom: '1px solid rgba(0, 0, 0, .125)',
		marginBottom: -1,
		minHeight: 56,
		'&$expanded': {
			minHeight: 56,
		},
		display: 'flex',
		justifyContent: 'space-between',
	},
	content: {
		'&$expanded': {
			margin: '12px 0',
		},
	},
	expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiAccordionDetails);

function Order() {
	const [order, setOrder] = useState([]);

	const getOrders = async () => {
		try {
			const res = await axios.get('/users/history');
			console.log(res.data.data);
			setOrder(res.data.data);
		} catch (err) {
			if (err && err.response && err.response.data) {
				toast.error(err.response.data.message);
			} else {
				toast.error('server is not running');
			}
		}
	};

	useEffect(() => {
		getOrders();
	}, []);

	return (
		<>
			<Typography component="div">
				<Box fontSize={30}>Orders History</Box>
			</Typography>
			{order.map((product) => (
				<div className="card mb-2" key={product._id}>
					<h5
						className="card-header d-flex justify-content-between flex-sm-row"
						style={{ flexDirection: 'column', fontSize: '1rem' }}
					>
						<span>OrderId: {product.id}</span> <span> name: {product.name}</span>
					</h5>

					<div className="card-body">
						<h5
							className="card-header d-flex justify-content-between flex-sm-row"
							style={{ flexDirection: 'column', fontSize: '1rem' }}
						>
							<span>TransactionId :{product.transactionId}</span>
							<span>Amount: ₹{product.price}</span>
						</h5>
						<h5
							className="card-header d-flex justify-content-between flex-sm-row"
							style={{ flexDirection: 'column', fontSize: '1rem' }}
						>
							<span>Quantity :{product.quantity}</span>
							<span>category : {product.category}</span>
						</h5>
					</div>
				</div>
			))}
		</>
	);
}

export default Order;
