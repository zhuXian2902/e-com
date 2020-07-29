/** @format */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './../utils/helpers';
import SignIn from './../components/user/SignIn';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
	// console.log(Component, isAuth());
	return (
		// restricted = false meaning public route
		// restricted = true meaning restricted route like login
		<Route
			{...rest}
			render={(props) =>
				isAuth() && restricted ? <Redirect to="/" /> : <Component {...props} />
			}
		/>
	);
};

export default PublicRoute;
