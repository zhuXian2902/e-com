/** @format */

import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from './../../utils/helpers';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { IconButton, withStyles, Badge } from '@material-ui/core';
import { totalItems } from './../../utils/cartHelpers';

const StyledBadge = withStyles((theme) => ({
	badge: {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 2px',
	},
}))(Badge);

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
			<li className="nav-item">
				<Link to="/cart" className="nav-link" style={isActive('/shop')}>
					<IconButton style={{ padding: 0 }} aria-label="cart">
						<StyledBadge badgeContent={totalItems()} color="secondary">
							<ShoppingCartOutlinedIcon />
						</StyledBadge>
					</IconButton>
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
