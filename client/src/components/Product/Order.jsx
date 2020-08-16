/** @format */

import React, { useState, useEffect } from 'react';
import Header from './Header';
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

const AccordionSummary = withStyles((theme) => ({
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
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.8rem',
			flexDirection: 'column',
		},
	},
	content: {
		'&$expanded': {
			margin: '12px 0',
		},
	},
	expanded: {},
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.8rem',
			flexDirection: 'column',
		},
	},
}))(MuiAccordionDetails);

function CustomizedAccordions({ products }) {
	const [expanded, setExpanded] = useState();

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	return products.map((item) => (
		<Accordion
			square
			expanded={expanded === `${item._id}`}
			onChange={handleChange(`${item._id}`)}
			key={item._id}
		>
			<AccordionSummary>
				<div>name : {item.name}</div>
			</AccordionSummary>
			<AccordionDetails>
				<div>Product-Id: {item._id}</div>
				<div>Qunatity : {item.count}</div>
				<div>Price : {item.price}</div>
			</AccordionDetails>
		</Accordion>
	));
}

function Order() {
	const [order, setOrder] = useState([]);

	const getOrders = async () => {
		try {
			const res = await axios.get('/orders');

			setOrder(res.data.orders);
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
				<Box fontSize={30}>Orders</Box>
			</Typography>
			{order.map((product) => (
				<div className="card mb-2" key={product._id}>
					<h5
						className="card-header d-flex justify-content-between flex-sm-row"
						style={{ flexDirection: 'column', fontSize: '1rem' }}
					>
						<span>OrderId: {product._id}</span> <span> status: {product.status}</span>
					</h5>

					<div className="card-body">
						<h5
							style={{ fontSize: '1rem' }}
							className="card-title d-flex justify-content-between"
						>
							<span>TransactionId :{product.transactionId}</span>
							<span>Amount: ₹{product.amount}</span>
						</h5>
						<p className="card-text">{product.address}</p>
						<CustomizedAccordions products={product.products} />
					</div>
				</div>
			))}
		</>
	);
}

export default Order;
