/** @format */

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Typography, Container, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Header from './Header';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { addItem } from './../../utils/cartHelpers';
import AddReviews from './AddReviews';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
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
	root: {
		display: 'flex',
		flexDirection: 'row',
		margin: '40px',
	},
	orange: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
		width: theme.spacing(12),
		height: theme.spacing(12),
		fontSize: '80px',
	},
	box: {
		display: 'flex',
		flexDirection: 'row',
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
			justifyContent: 'center',
		},
	},
}));

export default function ProductInfo(props) {
	const classes = useStyles();
	// console.log(props);
	const pid = props.match.params.pid;
	const url = process.env.REACT_APP_SERVER_IMAGE_URL;
	// const imageUrl = `${url}/products/${product.image}`;
	const [product, setProduct] = useState({});
	const [similarProducts, setSimilarProducts] = useState([]);
	const [reviews, setReviews] = useState([]);
	const [open, setOpen] = React.useState(false);
	const [num, setNum] = React.useState(0);
	const [change, setChange] = React.useState(false);
	const [rating, setRating] = React.useState(0);
	const [loading, setLoading] = React.useState(false);

	const handleClickOpen = (id) => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const relatedProducts = async (pid) => {
		if (pid) {
			const products = await axios.get(`/products/similar-products/${pid}`);
			setSimilarProducts(products.data.data);
		}
	};

	const getProducts = async (pid) => {
		if (pid) {
			try {
				setLoading(true);
				const res = await axios.get(`/products/${pid}`);
				setProduct(res.data.data);
				relatedProducts(pid);
				setLoading(false);
				// console.log(res.data.data);
			} catch (err) {
				if (err && err.response && err.response.data) {
					toast.error(err.response.data.message, toastOptions);
				} else {
					toast.error('server is not running', toastOptions);
				}
				setLoading(false);
			}
		}
	};

	const getReviews = async (pid) => {
		if (pid) {
			try {
				setLoading(true);
				const res = await axios.get(`/products/${pid}/reviews`);
				setReviews(res.data.data);
				setLoading(false);
				// console.log(res.data.data);
			} catch (err) {
				if (err && err.response && err.response.data) {
					toast.error(err.response.data.message, toastOptions);
				} else {
					toast.error('server is not running', toastOptions);
				}
				setLoading(false);
			}
		}
	};

	const getRatings = async (pid) => {
		if (pid !== undefined) {
			try {
				setLoading(true);
				const res = await axios.get(`/products/${pid}/reviews/ratings`);
				setRating(res.data.stats[0].avgRating);
				setNum(res.data.stats[0].num);
				// console.log(res.data.stats);
				setLoading(false);
			} catch (err) {
				if (err && err.response && err.response.data) {
					toast.error(err.response.data.message, toastOptions);
				}
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		getProducts(pid);
		getReviews(pid);
		getRatings(pid);
	}, [pid, change]);

	const addToCart = () => {
		addItem(product, () => {
			toast.success('item added to cart successfully', toastOptions);
		});
	};

	return (
		<>
			<Header />
			<Loading open={loading} />
			<ToastContainer {...toastOptions} />
			<main className="mt-3">
				<div className="container dark-grey-text">
					<div className="row">
						<div className="col-md-6 mb-4">
							<img
								src={`${url}/products/${product.image}`}
								className="img-fluid"
								alt="Product image"
								style={{ height: '450px' }}
							/>
						</div>

						<div className="col-md-6 mb-4">
							<div className="p-4">
								<p className="lead font-weight-bold">{product.name}</p>
								<Box component="fieldset" mb={1} borderColor="transparent">
									<Typography component="legend">Ratings</Typography>
									<Rating name="read-only" value={rating} readOnly /> by {num} users
								</Box>
								<p className="lead">
									<span>₹{product.price}</span>
								</p>
								<p>
									<span className="lead font-weight-bold mr-1">Category:</span>
									<span className="lead ">
										{product.category && product.category.name}
									</span>
								</p>
								<p className="lead font-weight-bold">Description</p>
								<p>{product.description}</p>
								<p>
									{product.quantity > 0 ? (
										<span className="badge badge-pill badge-primary">In Stock</span>
									) : (
										<span className="badge badge-pill badge-danger">Out of Stock</span>
									)}
								</p>
								{/*<input
										type="number"
										value="1"
										aria-label="Search"
										className="form-control"
										style="width: 100px"
                  />*/}
								{product.quantity <= 0 ? (
									<button
										disabled
										className="btn btn-danger btn-md my-0 p"
										type="submit"
									>
										Add to cart
										<AddShoppingCartIcon style={{ margin: '0 10px' }} />
									</button>
								) : (
									<button
										onClick={addToCart}
										className="btn btn-primary btn-md my-0 p"
										type="submit"
									>
										Add to cart
										<AddShoppingCartIcon style={{ margin: '0 10px' }} />
									</button>
								)}
								<button
									style={{ marginLeft: '20px' }}
									onClick={handleClickOpen}
									className="btn btn-primary btn-md my-0 p"
									type="submit"
								>
									Add Review
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
			<hr />

			<CssBaseline />
			{similarProducts.length > 0 && (
				<Container className={classes.cardGrid} maxWidth="md">
					<Typography variant="h4" style={{ paddingBottom: '20px' }}>
						Related Products
					</Typography>
					<Grid container spacing={4}>
						{similarProducts.map((product) => (
							<Grid item key={product._id} xs={12} sm={6} md={4}>
								<ProductCard product={product} />
							</Grid>
						))}
					</Grid>
				</Container>
			)}

			<hr />
			<Typography
				variant="h4"
				style={{
					display: 'flex',
					justifyContent: 'center',
					paddingBottom: '20px',
				}}
			>
				Product Reviews
			</Typography>
			<Container className={classes.cardGrid} maxWidth="md">
				<Grid item>
					{reviews.map((review) => (
						<Box key={review._id} mb={5} className={classes.box}>
							<Grid item sm={3} style={{ display: 'flex', justifyContent: 'center' }}>
								<Avatar
									alt={review.user.name}
									src="/broken-image.jpg"
									className={classes.orange}
								/>
							</Grid>
							<Grid
								item
								sm={9}
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Typography>{review.user.name}</Typography>
								<Rating name="read-only" value={review.rating} readOnly />
								<Typography variant="h6">{review.createdAt}</Typography>
								<Typography variant="h6">{review.review}</Typography>
							</Grid>
						</Box>
					))}
				</Grid>
			</Container>

			{open && (
				<AddReviews
					change={change}
					setChange={setChange}
					open={open}
					handleClose={handleClose}
					id={pid}
				/>
			)}
		</>
	);
}

// <Grid item xs={12} sm={7} md={7} elevation={6}>
// 					<div className={classes.paper}>hello there</div>
// 				</Grid>
