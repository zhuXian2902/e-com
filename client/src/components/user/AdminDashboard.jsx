/** @format */

import React, { useState } from 'react';
import axios from 'axios';
import Header from './../Product/Header';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import { isAuth } from './../../utils/helpers';
import Accordion from '../form/Accordion';
import AddCategory from '../form/AddCategory';
import AddProduct from '../form/AddProduct';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: '20px',
	},
}));

function AdminDashboard() {
	const classes = useStyles();
	const user = isAuth();
	const { name, email, role } = user;

	return (
		<div>
			<Header>
				<Card className={classes.root} variant="outlined">
					<CardHeader
						title="User Profile"
						// subheader="September 14, 2016"
					/>
				</Card>

				<Accordion head={name} />
				<Accordion head={email} />
				<Accordion head={role} />

				<Card className={classes.root} variant="outlined">
					<CardHeader
						title="Product"
						// subheader="September 14, 2016"
					/>
				</Card>
				<AddCategory />
				<AddProduct />
			</Header>
		</div>
	);
}

export default AdminDashboard;
