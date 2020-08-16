/** @format */

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box, Grid, AppBar } from '@material-ui/core';
import AddCategory from '../form/AddCategory';
import AddProduct from '../form/AddProduct';
import Order from '../Product/Order';
import Profile from './Profile';
import UpDel from './../Product/UpDel';
import axios from 'axios';
import Header from './../Product/Header';
import { isAuth } from './../../utils/helpers';

function TabPanel(props) {
	const { children, value, index } = props;

	return <div role="tabpanel">{value === index && <Box>{children}</Box>}</div>;
}

function TabPanelMobile(props) {
	const { children, value, index } = props;

	return (
		<div role="tabpanel">{value === index && <Box p={3}>{children}</Box>}</div>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		minHeight: '100vh',
		[theme.breakpoints.down('xs')]: {
			display: 'none',
		},
		height: '100%',
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
		height: '100%',
	},
	mobile: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
}));

function AdminDashboard() {
	const classes = useStyles();
	const user = isAuth();

	const { name, email, role } = user;

	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<Header />
			<div className={classes.root}>
				<Grid container spacing={3}>
					<Grid item sm={4} md={3}>
						<Tabs
							orientation="vertical"
							variant="scrollable"
							value={value}
							onChange={handleChange}
							className={classes.tabs}
						>
							<Tab label="User Profile" />
							<Tab label="Add Category" />
							<Tab label="view Orders" />
							<Tab label="Add Product" />
							<Tab label="Manage Product" />
						</Tabs>
					</Grid>
					<Grid item sm={8} md={9}>
						<TabPanel value={value} index={0}>
							<Profile />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<AddCategory />
						</TabPanel>
						<TabPanel value={value} index={2}>
							<Order />
						</TabPanel>
						<TabPanel value={value} index={3}>
							<AddProduct />
						</TabPanel>
						<TabPanel value={value} index={4}>
							<UpDel />
						</TabPanel>
					</Grid>
				</Grid>
			</div>
			<div className={classes.mobile}>
				<AppBar position="static" color="default">
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="secondary"
						textColor="secondary"
						variant="scrollable"
						scrollButtons="auto"
					>
						<Tab label="User Profile" />
						<Tab label="Add Category" />
						<Tab label="view Orders" />
						<Tab label="Add Product" />
						<Tab label="Manage Product" />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<Profile />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<AddCategory />
				</TabPanel>
				<TabPanel value={value} index={2}>
					<Order />
				</TabPanel>
				<TabPanel value={value} index={3}>
					<AddProduct />
				</TabPanel>
				<TabPanel value={value} index={4}>
					<UpDel />
				</TabPanel>
			</div>
		</>
	);
}

export default AdminDashboard;
