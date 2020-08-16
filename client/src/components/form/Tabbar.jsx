/** @format */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Box, Grid } from '@material-ui/core';
import AddCategory from '../form/AddCategory';
import AddProduct from '../form/AddProduct';
import Order from '../Product/Order';

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
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
		height: '100%',
	},
}));

export default function VerticalTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
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
						<Tab label="Item Five" />
						<Tab label="Item Six" />
						<Tab label="Item Seven" />
					</Tabs>
				</Grid>
				<Grid item sm={8} md={9}>
					<TabPanel value={value} index={0}></TabPanel>
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
						Item Five
					</TabPanel>
					<TabPanel value={value} index={5}>
						Item Six
					</TabPanel>
					<TabPanel value={value} index={6}>
						Item Seven
					</TabPanel>
				</Grid>
			</Grid>
		</div>
	);
}
