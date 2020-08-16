/** @format */

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Header from './Header';
import Search from './Search';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Grid, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loading from './Loading';

const toastOptions = {
	position: 'top-center',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: false,
	draggable: false,
	progress: undefined,
};

const useStyles = makeStyles((theme) => ({
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	box: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
	},
}));

function DashBoard() {
	const classes = useStyles();

	const [BestSeller, setBestSeller] = useState([]);
	const [Arrival, setArrival] = useState([]);
	const [open, setOpen] = React.useState(false);

	const getProducts = async (sortBy) => {
		try {
			setOpen(true);
			const res = await axios.get(`/products?sort=-${sortBy}&limit=6`);
			sortBy === 'updatedAt'
				? setArrival(res.data.data)
				: setBestSeller(res.data.data);
			setOpen(false);
		} catch (err) {
			if (err && err.response && err.response.data) {
				toast.error(err.response.data.message, toastOptions);
			} else {
				toast.error('server is not running', toastOptions);
			}
			setOpen(false);
		}
	};

	useEffect(() => {
		getProducts('sold');
		getProducts('updatedAt');
	}, []);

	return (
		<>
			<Header className={classes.box} />
			<Loading open={open} />
			<Search toastOptions={toastOptions} />
			<ToastContainer {...toastOptions} />
			<Container className={classes.cardGrid} maxWidth="md">
				<Typography variant="h3">BestSeller</Typography>
				<Grid container spacing={4}>
					{BestSeller.map((product) => (
						<Grid item key={product._id} xs={12} sm={6} md={4}>
							<ProductCard product={product} />
						</Grid>
					))}
				</Grid>
			</Container>
			<Container className={classes.cardGrid} maxWidth="md">
				<Typography variant="h3">New Arrivals</Typography>
				<Grid container spacing={2}>
					{Arrival.map((product) => (
						<Grid item key={product._id} xs={12} sm={6} md={4}>
							<ProductCard product={product} />
						</Grid>
					))}
				</Grid>
			</Container>
		</>
	);
}

export default DashBoard;
