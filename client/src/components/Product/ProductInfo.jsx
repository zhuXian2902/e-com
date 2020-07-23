/** @format */

import React from 'react';
import ProductCard from './ProductCard';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
}));

export default function ProductInfo() {
	const classes = useStyles();

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={12} sm={5} md={5}>
				<ProductCard />
			</Grid>
			<Grid item xs={12} sm={7} md={7} elevation={6} square>
				<div className={classes.paper}>hello there</div>
			</Grid>
		</Grid>
	);
}
