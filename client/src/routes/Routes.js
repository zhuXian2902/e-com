/** @format */

import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from '../components/Product/Home';
import Header from '../components/Product/Header';
import SignUp from '../components/user/SignUp';
import SignIn from '../components/user/SignIn';
import Activate from '../components/user/Activate';
// import Forgot from "../components/Forgot";
// import Reset from "../components/Reset";
import UserDashboard from '../components/user/UserDashboard';
import DashBoard from '../components/user/DashBoard';
import AdminDashboard from '../components/user/AdminDashboard';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AdminRoute from './AdminRoute';
import { Route, Redirect } from 'react-router-dom';
import Shop from './../components/Product/Shop';
import Cart from './../components/Product/Cart';
import ProductInfo from './../components/Product/ProductInfo';

const Routes = () => {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<AdminRoute path="/admindashboard" exact component={AdminDashboard} />
					<PrivateRoute path="/userdashboard" exact component={UserDashboard} />
					<PublicRoute
						restricted={true}
						path="/auth/activate/:token"
						exact
						component={Activate}
					/>
					<PublicRoute restricted={true} path="/signup" exact component={SignUp} />
					<PublicRoute restricted={true} path="/signin" exact component={SignIn} />
					<PublicRoute path="/shop" exact component={Shop} />
					<PublicRoute path="/cart" exact component={Cart} />
					<PublicRoute path="/products/:pid" exact component={ProductInfo} />
					<PublicRoute restricted={false} path="/" exact component={Home} />
					<PrivateRoute path="/dashboard" exact component={DashBoard} />
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default Routes;

// <PublicRoute
// 					restricted
// 					path="/auth/password/forgot"
// 					exact
// 					component={Forgot}
// 				/>
// 				<PublicRoute
// 					restricted
// 					path="/auth/password/reset/:token"
// 					exact
// 					component={Reset}
// 				/>
//
