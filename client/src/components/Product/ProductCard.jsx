/** @format */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Button,
	Typography,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	CardActionArea,
} from '@material-ui/core';
import { addItem } from './../../utils/cartHelpers';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
	cardGrid: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: '#f7f6f9',
	},
	cardMedia: {
		paddingTop: '0%', // 16:9
		backgroundColor: 'purple',
	},
	cardContent: {
		flexGrow: 1,
	},
}));

const toastOptions = {
	position: 'top-center',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: false,
	draggable: false,
	progress: undefined,
};

function ProductCard({ product }) {
	const classes = useStyles();
	const imageUrl = process.env.REACT_APP_SERVER_IMAGE_URL;
	const url = `${imageUrl}/products/${product.image}`;

	const addToCart = () => {
		addItem(product, () => {
			toast.success('item added to cart successfully', toastOptions);
		});
	};

	return (
		<div>
			<ToastContainer {...toastOptions} />
			<Card className={classes.card}>
				<CardActionArea to="/dashboard">
					<CardMedia
						className={classes.cardMedia}
						component="img"
						alt="Contemplative Reptile"
						height="200"
						image={url}
						title="Contemplative Reptile"
					/>
				</CardActionArea>
				<CardContent className={classes.cardContent}>
					<Typography gutterBottom variant="h5" component="h2">
						{product.name.toUpperCase()}
					</Typography>
					<Typography height="20px" variant="h5" color="textSecondary" component="p">
						{/*product.description.substring(0, 30).....*/}
						Price ₹{product.price}
					</Typography>
				</CardContent>

				<CardActions>
					<Button
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
		</div>
	);
}

export default ProductCard;
