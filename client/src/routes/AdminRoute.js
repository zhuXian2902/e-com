/** @format */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../utils/helpers';

const AdminRoute = ({ component: Component, ...rest }) => {
	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /signin page
		<Route
			{...rest}
			render={(props) =>
				isAuth() && (isAuth().role === 'admin' || isAuth().role === 'seller') ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
				)
			}
		/>
	);
};

export default AdminRoute;
