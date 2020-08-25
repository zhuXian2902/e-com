/** @format */

import ListItem from '@material-ui/core/ListItem';

import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from './../../utils/helpers';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import {
	AppBar,
	Toolbar,
	IconButton,
	withStyles,
	Badge,
	makeStyles,
	SwipeableDrawer,
	List,
	Divider,
	Button,
} from '@material-ui/core';
import { totalItems } from './../../utils/cartHelpers';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
	list: {
		width: 250,
	},
	mobile: {
		[theme.breakpoints.down('xs')]: {
			display: 'none',
		},
	},
}));

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
			return { color: '#ff9912' };
		} else {
			return { color: '#000' };
		}
	};

	const imageUrl = process.env.REACT_APP_SERVER_IMAGE_URL;
	const url = `${imageUrl}/users/`;
	const user = isAuth();

	const iconUrl = process.env.REACT_APP_SERVER_IMAGE_URL;
	const iconurl = `${imageUrl}/icon/me.png`;

	const [img, setImg] = useState(user.image);
	useEffect(() => {
		setImg(user.image);
	}, [img]);

	const nav = () => (
		<>
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
		</>
	);

	const [state, setState] = React.useState(false);

	const toggleDrawer = (open) => (event) => {
		if (
			event &&
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setState(open);
	};

	const list = () => (
		<div
			className={classes.list}
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<List>
				{nav()}
				{!isAuth() && (
					<>
						<li style={{ listStyle: 'none' }}>
							<span variant="contained" className="nav-item">
								<Link to="/signin" className="nav-link" style={isActive('/signin')}>
									Sign in
								</Link>
							</span>
						</li>
						<li style={{ listStyle: 'none' }}>
							<span variant="contained" className="nav-item">
								<Link to="/signup" className="nav-link" style={isActive('/signup')}>
									Sign up
								</Link>
							</span>
						</li>
					</>
				)}
				{isAuth() && (
					<li style={{ alignSelf: 'center' }} className="nav-item">
						<span
							variant="contained"
							className="nav-link"
							style={{ cursor: 'pointer', color: '#000' }}
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
			</List>
			<Divider />
			<List></List>
		</div>
	);

	const classes = useStyles();
	return (
		<Fragment>
			<AppBar position="fixed">
				<Toolbar style={{ listStyle: 'none' }}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={toggleDrawer(true)}
					>
						<MenuIcon />
					</IconButton>
					<SwipeableDrawer
						className={classes.list}
						anchor="left"
						open={state}
						onClose={toggleDrawer(false)}
						onOpen={toggleDrawer(true)}
					>
						{list()}
					</SwipeableDrawer>
					<div style={{ width: '100%' }}>
						<div
							width="100%"
							className="d-flex flex-row justify-content-sm-between justify-content-center"
						>
							<div className={classes.mobile}>
								<div className="d-flex flex-row align-items-center">{nav()}</div>
							</div>

							<div>
								<li style={{ listStyle: 'none' }}>
									<Link to="/" className="nav-link" style={isActive('/')}>
										<img alt="icon" src={iconurl} />
									</Link>
								</li>
							</div>
							<div className={classes.mobile}>
								<div className="d-flex flex-row">
									{isAuth() && isAuth().role === 'user' && (
										<>
											<li className="nav-item">
												<Link
													to="/userdashboard"
													className="nav-link"
													style={isActive('/userdashboard')}
												>
													<Avatar alt={user.name} src={`${url}/${user.image}`} />
												</Link>
											</li>
											{/*<li className="nav-item">
                    <Link to="/dashboard" className="nav-link" style={isActive('/dashboard')}>
                      dashboard2
                    </Link>
              </li>*/}
										</>
									)}
									{isAuth() &&
										(isAuth().role === 'admin' || isAuth().role === 'seller') && (
											<li className="nav-item">
												<Link
													to="/admindashboard"
													className="nav-link"
													style={isActive('/admindashboard')}
												>
													<Avatar alt={user.name} src={`${url}/${user.image}`} />
												</Link>
											</li>
										)}
									{!isAuth() && (
										<>
											<li style={{ listStyle: 'none' }}>
												<Button
													style={{
														padding: '0px 0px',
														alignSelf: 'center',
														margin: '0 4px',
													}}
													variant="contained"
													className="nav-item"
												>
													<Link
														to="/signin"
														className="nav-link"
														style={isActive('/signin')}
													>
														Sign in
													</Link>
												</Button>
											</li>
											<li style={{ listStyle: 'none' }}>
												<Button
													style={{
														padding: '0px 0px',
														margin: '0 4px',
														alignSelf: 'center',
													}}
													variant="contained"
													className="nav-item"
												>
													<Link
														to="/signup"
														className="nav-link"
														style={isActive('/signup')}
													>
														Sign up
													</Link>
												</Button>
											</li>
										</>
									)}
									{isAuth() && (
										<li style={{ alignSelf: 'center' }} className="nav-item float-right">
											<Button
												variant="contained"
												className="nav-link"
												style={{ cursor: 'pointer', color: '#000' }}
												onClick={() => {
													signout(() => {
														history.push('/');
													});
												}}
											>
												Signout
											</Button>
										</li>
									)}
								</div>
							</div>
						</div>
					</div>
				</Toolbar>
			</AppBar>
			<Toolbar>{children}</Toolbar>
		</Fragment>
	);
};

export default withRouter(Layout);
