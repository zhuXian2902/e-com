/** @format */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { getCartItems, getTotalItems } from './../../utils/cartHelpers';

const useStyles = makeStyles((theme) => ({
	listItem: {
		padding: theme.spacing(1, 0),
	},
	total: {
		fontWeight: 700,
	},
	title: {
		marginTop: theme.spacing(2),
	},
}));

export default function Review({ values }) {
	const classes = useStyles();
	const products = getCartItems()[0];
	const addresses = [
		values.address,
		values.city,
		values.state,
		values.zip,
		values.country,
	];

	const payments = [
		{ name: 'Card number', detail: '4111-1111-1111-1111' },
		{ name: 'Expiry date', detail: '11/22' },
		{ name: 'CVV', detail: '111' },
	];

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Order summary
			</Typography>
			<List disablePadding>
				{products.map((product) => (
					<ListItem className={classes.listItem} key={product.name}>
						<ListItemText primary={product.name} secondary={product.desc} />
						<Typography variant="body2">{product.price * product.count}</Typography>
					</ListItem>
				))}
				<ListItem className={classes.listItem}>
					<ListItemText primary="Total" />
					<Typography variant="subtitle1" className={classes.total}>
						₹{getCartItems()[1]}
					</Typography>
				</ListItem>
			</List>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography variant="h6" gutterBottom className={classes.title}>
						Shipping
					</Typography>
					<Typography gutterBottom>
						{values.firstName} {values.lastName}
					</Typography>
					<Typography gutterBottom>{addresses.join(', ')}</Typography>
				</Grid>
				<Grid item container direction="column" xs={12} sm={6}>
					<Typography variant="h6" gutterBottom className={classes.title}>
						Pay with these Details
					</Typography>
					<Grid container>
						{payments.map((payment) => (
							<React.Fragment key={payment.name}>
								<Grid item xs={4}>
									<Typography gutterBottom>{payment.name}</Typography>
								</Grid>
								<Grid item xs={8}>
									<Typography gutterBottom>{payment.detail}</Typography>
								</Grid>
							</React.Fragment>
						))}
					</Grid>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
