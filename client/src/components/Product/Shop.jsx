/** @format */

import React, { useState, useEffect } from 'react';
import Header from './Header';
import ProductCard from './ProductCard';
import CategoryCheckbox from './CategoryCheckbox';
import Page from './Page';
import PriceFilter from './PriceFilter';
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
	const [count, setCount] = useState();

	const getCategories = async () => {
		try {
			const res = await axios.get('/category');
			setCategories(res.data.data);
		} catch (err) {
			if (err && err.response && err.response.data) {
				toast.error(err.response.data.message, toastOptions);
			} else {
				toast.error('server is not running', toastOptions);
			}
		}
	};

	useEffect(() => {
		getCategories();
	}, []);

	useEffect(() => {
		getProducts();
	}, [queryCategory, queryPrice, page]);

	const handleFilter = (filterArr, by, gte = 0, lte = 100000) => {
		if (by === 'category') {
			setQueryCategory(filterArr);
		} else if (by === 'price') {
			setQueryPrice(`price[gte]=${gte}&price[lte]=${lte}`);
		} else if (by === 'page') {
			setPage(filterArr);
		}
	};

	const getProducts = async () => {
		try {
			let queryString = `${queryPrice}&page=${page}&category=${queryCategory}`;
			// console.log(queryString);
			const res = await axios.get(`/products?${queryString}`);
			setResult(res.data.data);
			setCount(res.data.size);
		} catch (err) {
			if (err && err.response && err.response.data) {
				toast.error(err.response.data.message, toastOptions);
			} else {
				toast.error('server is not running', toastOptions);
			}
		}
	};

	return (
		<div>
			<Header />
			<Container>
				<ToastContainer {...toastOptions} />
				<Grid style={{ marginTop: '20px' }} container>
					<Grid item sm={3}>
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
						<Page count={count} handleFilter={(page) => handleFilter(page, 'page')} />
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Shop;
