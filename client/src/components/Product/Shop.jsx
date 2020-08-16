/** @format */

import React, { useState, useEffect } from 'react';
import Header from './Header';
import ProductCard from './ProductCard';
import CategoryCheckbox from './CategoryCheckbox';
import Page from './Page';
import PriceFilter from './PriceFilter';
import SortBy from './SortBy';
import Loading from './Loading';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import {
	FormGroup,
	Divider,
	FormLabel,
	Grid,
	Container,
} from '@material-ui/core';

const toastOptions = {
	position: 'top-center',
	autoClose: 5000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: false,
	draggable: false,
	progress: undefined,
};

const Shop = () => {
	const [categories, setCategories] = useState([]);
	const [queryCategory, setQueryCategory] = useState('');
	const [queryPrice, setQueryPrice] = useState(`price[gte]=0`);
	const [result, setResult] = useState([]);
	const [page, setPage] = useState(1);
	const [sortby, setSortby] = useState('price');
	const [open, setOpen] = useState(false);
	const [productsSize, setProductsSize] = useState(0);

	const getCategories = async () => {
		try {
			setOpen(true);
			const res = await axios.get('/category');
			setCategories(res.data.data);
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

	const getProductsSize = async () => {
		try {
			setOpen(true);
			const res = await axios.get('/products');
			setProductsSize(Math.ceil(res.data.size / 6));
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
		getCategories();
		getProductsSize();
	}, []);

	useEffect(() => {
		getProducts();
	}, [queryCategory, queryPrice, page, sortby]);

	const handleFilter = (filterArr, by, gte = 0, lte = 100000) => {
		if (by === 'category') {
			setQueryCategory(filterArr);
		} else if (by === 'price') {
			setQueryPrice(`price[gte]=${gte}&price[lte]=${lte}`);
		} else if (by === 'page') {
			setPage(filterArr);
		} else if (by === 'sortby') {
			if (filterArr == 0) setSortby('price');
			else if (filterArr == 1) setSortby('-price');
			else if (filterArr == 2) setSortby('-sold');
		}
	};

	const getProducts = async () => {
		try {
			setOpen(true);
			let queryString = `sort=${sortby}&${queryPrice}&page=${page}&category=${queryCategory}&limit=6`;
			// console.log(queryString);
			const res = await axios.get(`/products?${queryString}`);
			setResult(res.data.data);
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

	return (
		<>
			<Header />
			<Container>
				<Loading open={open} />
				<ToastContainer {...toastOptions} />
				<Grid style={{ marginTop: '20px' }} container>
					<Grid item sm={3}>
						<SortBy handleFilter={(filterArr) => handleFilter(filterArr, 'sortby')} />
						<Divider style={{ marginBottom: '20px' }} />
						<PriceFilter
							handleFilter={(filter, gte, lte) =>
								handleFilter(filter, 'price', gte, lte)
							}
						/>
						<Divider style={{ marginBottom: '20px' }} />
						<FormLabel component="legend">Category</FormLabel>
						<FormGroup>
							<CategoryCheckbox
								categories={categories}
								handleFilter={(filterArr) => handleFilter(filterArr, 'category')}
							/>
						</FormGroup>
					</Grid>

					<Grid item sm={9}>
						<Grid container spacing={2}>
							{result.map((product) => (
								<Grid item key={product._id} xs={12} sm={6} md={4}>
									<ProductCard product={product} />
								</Grid>
							))}
						</Grid>
						<Page
							count={productsSize}
							handleFilter={(page) => handleFilter(page, 'page')}
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default Shop;
