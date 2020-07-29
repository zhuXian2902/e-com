/** @format */

import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from './../../utils/helpers';

const Layout = ({ children, match, history }) => {
	// console.log(history, children, match);
	// console.log(isAuth());
	const isActive = (path) => {
		if (match.path === path) {
			return { color: '#000' };
		} else {
			return { color: '#fff' };
		}
	};

	const nav = () => (
		<ul className="nav nav-tabs bg-primary">
			<li className="nav-item">
				<Link to="/" className="nav-link" style={isActive('/')}>
					Home
				</Link>
			</li>
			<li className="nav-item">
				<Link to="/shop" className="nav-link" style={isActive('/shop')}>
					Shop
				</Link>
			</li>
			{!isAuth() && (
				<>
					<li className="nav-item">
						<Link to="/signin" className="nav-link" style={isActive('/signin')}>
							Signin
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/signup" className="nav-link" style={isActive('/signup')}>
							Signup
						</Link>
					</li>
				</>
			)}

			{isAuth() && isAuth().role === 'user' && (
				<li className="nav-item">
					<Link
						to="/userdashboard"
						className="nav-link"
						style={isActive('/userdashboard')}
					>
						Dashboard
					</Link>
				</li>
			)}
			{isAuth() && (isAuth().role === 'admin' || isAuth().role === 'seller') && (
				<li className="nav-item">
					<Link
						to="/admindashboard"
						className="nav-link"
						style={isActive('/admindashboard')}
					>
						Dashboard
					</Link>
				</li>
			)}

			{isAuth() && (
				<li className="nav-item">
					<span
						className="nav-link"
						style={{ cursor: 'pointer', color: '#fff' }}
						onClick={() => {
							signout(() => {
								history.push('/');
							});
						}}
					>
						Signout
					</span>
				</li>
			)}
		</ul>
	);

	return (
		<Fragment>
			{nav()}
			<div className="container">{children}</div>
		</Fragment>
	);
};

export default withRouter(Layout);
