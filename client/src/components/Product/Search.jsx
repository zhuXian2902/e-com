/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProductCard from './ProductCard';
import {
	NativeSelect,
	FormControl,
	makeStyles,
	withStyles,
	InputBase,
	IconButton,
	Paper,
	TextField,
	CircularProgress,
	Divider,
	Container,
	Grid,
	Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';

const BootstrapInput = withStyles((theme) => ({
	root: {
		'label + &': {
			marginTop: theme.spacing(3),
		},
		maxWidth: '130px',
	},
	input: {
		borderRadius: 4,
		position: 'relative',
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #ced4da',
		fontSize: 14,
		padding: '10px 26px 10px 12px',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:focus': {
			borderRadius: 4,
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		},
	},
}))(InputBase);

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		marginBottom: theme.spacing(3),
		justifyContent: 'center',
	},
	margin: {
		margin: theme.spacing(1),
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
}));

function Search({ toastOptions }) {
	const classes = useStyles();
	const [categories, setCategories] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [category, setCategory] = useState('');
	const [search, setSearch] = useState('');
	const [options, setOptions] = useState([]);
	const [open, setOpen] = useState(false);
	const [isSearch, setIsSearch] = useState(false);
	const loading = open && options.length === 0;

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

	const handleChange = (e) => {
		const value = e.target.value;
		value === 'All' ? setCategory('') : setCategory(value);
	};

	const handleClick = async (e) => {
		try {
			e.preventDefault();
			setIsSearch(true);
			console.log(search);
			let queryString = ``;
			if (search.length > 0) queryString = `name=${search}`;
			console.log(queryString);
			const res = await axios.get(`/products?category=${category}&${queryString}`);
			setSearchResults(res.data.data);
			setSearch('');
			console.log(res.data.data);
		} catch (err) {
			console.log(err);
			if (err && err.response && err.response.data) {
				console.log(1);
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
		let active = true;
		if (!loading) {
			return undefined;
		}

		(async () => {
			const result = await axios.get(`/products?category=${category}`);
			const res = result.data.data;
			console.log(res);
			if (active) {
				setOptions(res);
			}
		})();
		return () => {
			active = false;
		};
	}, [loading]);

	useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	const results = () => {
		return (
			<Container className={classes.cardGrid} maxWidth="md">
				{isSearch && searchResults.length > 0 && (
					<Typography variant="h4">found {searchResults.length} results</Typography>
				)}
				{isSearch && searchResults.length === 0 && (
					<Typography variant="h4">No results</Typography>
				)}
				<Grid container spacing={4}>
					{searchResults.map((product) => (
						<Grid item key={product._id} xs={12} sm={6} md={4}>
							<ProductCard product={product} />
						</Grid>
					))}
				</Grid>
			</Container>
		);
	};

	return (
		<>
			<Paper component="form" className={classes.root}>
				<FormControl className={classes.margin}>
					<NativeSelect
						value={category}
						onChange={handleChange}
						input={<BootstrapInput />}
					>
						<option value="All">All categories</option>
						{categories.map((category) => (
							<option key={category._id} value={category._id}>
								{category.name}
							</option>
						))}
					</NativeSelect>
				</FormControl>
				<Autocomplete
					className={classes.input}
					id="asynchronous-demo"
					style={{ width: 300 }}
					open={open}
					onOpen={() => {
						setOpen(true);
					}}
					onClose={() => {
						setOpen(false);
					}}
					search={search}
					onInputChange={(event, newValue) => {
						setSearch(newValue);
					}}
					getOptionSelected={(option, value) => option.name === value.name}
					getOptionLabel={(option) => option.name}
					options={options}
					loading={loading}
					renderOption={(option) => <React.Fragment>{option.name}</React.Fragment>}
					style={{ underline: 'none' }}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Search products"
							// variant="outlined"
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<React.Fragment>
										{loading ? <CircularProgress color="inherit" size={20} /> : null}
										{params.InputProps.endAdornment.props.children[0]}
									</React.Fragment>
								),
							}}
						/>
					)}
				/>
				<Divider orientation="vertical" style={{ height: '45px' }} />
				<IconButton
					onClick={handleClick}
					type="submit"
					className={classes.iconButton}
					aria-label="search"
				>
					<SearchIcon />
				</IconButton>
			</Paper>
			{results()}
		</>
	);
}

export default Search;
