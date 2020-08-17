/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Chip from '@material-ui/core/Chip';
import Loading from './Loading';
import UpdateProduct from './../form/UpdateProduct';
import { toast, ToastContainer } from 'react-toastify';

const useRowStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			borderBottom: 'unset',
		},
	},
}));

const toastOptions = {
	position: 'top-center',
	autoClose: 5000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: false,
	draggable: false,
	progress: undefined,
};

function UpDel() {
	const [products, setProducts] = useState([]);
	const [change, setChange] = useState(false);
	const [loading, setLoading] = useState(false);
	const [id, setId] = useState('');
	const classes = useRowStyles();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = (id) => {
		setOpen(true);
		setId(id);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const getProducts = async () => {
		const res = await axios.get('/products');
		setProducts(res.data.data);
	};

	const deleteProduct = async (id) => {
		try {
			setLoading(true);
			const res = await axios.delete(`products/${id}`);
			setChange(!change);
			getProducts();
			setLoading(false);
			toast.success('product deleted successfully', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (err) {
			toast.error(err.response.data.message, {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	useEffect(() => {
		getProducts();
	}, [change]);

	return (
		<TableContainer component={Paper}>
			<Loading open={loading} />
			{open && (
				<UpdateProduct
					change={change}
					setChange={setChange}
					open={open}
					handleClose={handleClose}
					id={id}
				/>
			)}
			<Table aria-label="collapsible table">
				<TableBody>
					{products.map((product) => (
						<React.Fragment key={product._id}>
							<TableRow className={classes.root}>
								<TableCell component="th" scope="row">
									{product.name}
								</TableCell>
								<TableCell align="right">
									<Chip
										color="primary"
										onClick={() => handleClickOpen(product._id)}
										label="Update"
										clickable
									/>
								</TableCell>
								<TableCell align="right">
									<Chip
										onClick={() => deleteProduct(product._id)}
										color="secondary"
										label="Delete"
										clickable
									/>
								</TableCell>
							</TableRow>
						</React.Fragment>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default UpDel;
