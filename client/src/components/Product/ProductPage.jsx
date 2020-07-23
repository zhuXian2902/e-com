/** @format */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core';
import ProductCard from './ProductCard';

const useStyles = makeStyles((theme) => ({
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
}));

export default function ImgMediaCard() {
	const classes = useStyles();

	const cards = [1, 2, 3, 4, 5, 6, 7];
	return (
		<Container className={classes.cardGrid} maxWidth="md">
			<Grid container spacing={4}>
				{cards.map((card) => (
					<Grid item key={card} xs={12} sm={6} md={4}>
						<ProductCard />
					</Grid>
				))}
			</Grid>
		</Container>
	);
}
