/** @format */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Card, Button } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import { addItem } from './../../utils/cartHelpers';
import { Link, Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

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
	root: {
		maxWidth: 345,
	},
	media: {
		height: '300px',
		paddingTop: '56.25%', // 16:9
	},
	[theme.breakpoints.between('sm', 'md')]: {
		media: {
			height: '250px',
			paddingTop: '56.25%', // 16:9
		},
	},

	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
}));

export default function RecipeReviewCard({ product }) {
	const classes = useStyles();
	const [redirect, setRedirect] = React.useState(false);
	// const classes = useStyles();
	const imageUrl = process.env.REACT_APP_SERVER_IMAGE_URL;
	const url = `${imageUrl}/products/${product.image}`;

	const addToCart = () => {
		addItem(product, () => {
			toast.success('item added to cart successfully', toastOptions);
			setRedirect(true);
		});
	};

	if (redirect) {
		return <Redirect to="/cart" />;
	}

	return (
		<Card className={classes.root}>
			<CardHeader title={product.name.toUpperCase()} />
			<CardMedia className={classes.media} image={url} title={product.name} />
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{product.description.substring(0, 30)}
					<br />
					Price ₹{product.price}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<Button
					style={{ marginRight: '10px' }}
					onClick={addToCart}
					variant="contained"
					size="small"
					color="primary"
				>
					Add to Cart
				</Button>

				<Link to={`/products/${product._id}`} style={{ underline: 'none' }}>
					<Button variant="contained" size="small" color="primary">
						View Details
					</Button>
				</Link>
			</CardActions>
		</Card>
	);
}
