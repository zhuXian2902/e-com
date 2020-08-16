/** @format */

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box, Grid, AppBar } from '@material-ui/core';
import AddCategory from '../form/AddCategory';
import AddProduct from '../form/AddProduct';
import History from './History';
import axios from 'axios';
import Header from './../Product/Header';
import { isAuth } from './../../utils/helpers';
import Profile from './Profile';
import Password from './Password';

function TabPanel(props) {
	const { children, value, index } = props;

	return <div role="tabpanel">{value === index && <Box>{children}</Box>}</div>;
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
				<Grid container spacing={1}>
					<Grid item sm={4} md={3}>
						<Tabs
							orientation="vertical"
							variant="scrollable"
							value={value}
							onChange={handleChange}
							className={classes.tabs}
						>
							<Tab label="Profile Setting" />
							<Tab label="Update Password" />
							<Tab label="view Orders" />
						</Tabs>
					</Grid>
					<Grid item sm={8} md={9}>
						<TabPanel value={value} index={0}>
							<Profile />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<Password />
						</TabPanel>
						<TabPanel value={value} index={2}>
							<History />
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
						<Tab label="Profile Setting" />
						<Tab label="Update Password" />
						<Tab label="view Orders" />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<Profile />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Password />
				</TabPanel>
				<TabPanel value={value} index={2}>
					<History />
				</TabPanel>
			</div>
		</>
	);
}

export default AdminDashboard;
