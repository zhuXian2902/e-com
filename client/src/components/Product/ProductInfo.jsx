/** @format */

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Typography } from '@material-ui/core';
import Header from './Header';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { addItem } from './../../utils/cartHelpers';

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
		// height: '100vh',
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

	const relatedProducts = async (pid) => {
		const products = await axios.get(`/products/similar-products/${pid}`);
		setSimilarProducts(products.data.data);
	};

	const getProducts = async (pid) => {
		try {
			const res = await axios.get(`/products/${pid}`);
			setProduct(res.data.data);
			relatedProducts(pid);

			console.log(res.data.data);
		} catch (err) {
			if (err && err.response && err.response.data) {
				toast.error(err.response.data.message, toastOptions);
			} else {
				toast.error('server is not running', toastOptions);
			}
		}
	};

	useEffect(() => {
		getProducts(pid);
	}, [pid]);

	const addToCart = () => {
		addItem(product, () => {
			toast.success('item added to cart successfully', toastOptions);
		});
	};

	return (
		<Header>
			<ToastContainer {...toastOptions} />
			<main className="mt-5 pt-4">
				<div className="container dark-grey-text mt-5">
					<div className="row wow fadeIn">
						<div className="col-md-6 mb-4">
							<img
								src={`${url}/products/${product.image}`}
								className="img-fluid"
								alt="Product image"
							/>
						</div>

						<div className="col-md-6 mb-4">
							<div className="p-4">
								<p className="lead font-weight-bold">{product.name}</p>
								<p className="lead">
									<span className="mr-1">
										<del>$200</del>
									</span>
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
								<button
									onClick={addToCart}
									className="btn btn-primary btn-md my-0 p"
									type="submit"
								>
									Add to cart
									<i className="fas fa-shopping-cart ml-1"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
			<hr />
			<Grid container component="main" className={classes.root}>
				<CssBaseline />
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
			</Grid>
		</Header>
	);
}

// <Grid item xs={12} sm={7} md={7} elevation={6}>
// 					<div className={classes.paper}>hello there</div>
// 				</Grid>
