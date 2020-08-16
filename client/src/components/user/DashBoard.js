/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Header from './../Product/Header';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from './../../utils/helpers';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { withStyles, Badge } from '@material-ui/core';
import { totalItems } from './../../utils/cartHelpers';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: '#3f51b5',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	list: {
		listStyle: 'none',
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

function ResponsiveDrawer(props) {
	const { window } = props;
	const { children, match, history } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

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
				<>
					<li className="nav-item">
						<Link
							to="/userdashboard"
							className="nav-link"
							style={isActive('/userdashboard')}
						>
							Dashboard
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/dashboard" className="nav-link" style={isActive('/dashboard')}>
							dashboard2
						</Link>
					</li>
				</>
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
		</>
	);

	const isActive = (path) => {
		if (match.path === path) {
			return { color: '#000' };
		} else {
			return { color: '#fff' };
		}
	};

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>{nav()}</List>
			<Divider />
			<List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Header>
			<div className={classes.root}>
				<CssBaseline />
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar className={classes.list}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							className={classes.menuButton}
						>
							<MenuIcon />
						</IconButton>
						{nav()}
					</Toolbar>
				</AppBar>
				<nav className={classes.drawer} aria-label="mailbox folders">
					{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
					<Hidden smUp implementation="css">
						<Drawer
							container={container}
							variant="temporary"
							anchor={theme.direction === 'rtl' ? 'right' : 'left'}
							open={mobileOpen}
							onClose={handleDrawerToggle}
							classes={{
								paper: classes.drawerPaper,
							}}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
						>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation="css">
						<Drawer
							classes={{
								paper: classes.drawerPaper,
							}}
							variant="permanent"
							open
						>
							{drawer}
						</Drawer>
					</Hidden>
				</nav>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Typography paragraph>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
						non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
						imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
						Convallis convallis tellus id interdum velit laoreet id donec ultrices.
						Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
						adipiscing bibendum est ultricies integer quis. Cursus euismod quis
						viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin
						fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
						tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
						varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
						Lorem donec massa sapien faucibus et molestie ac.
					</Typography>
					<Typography paragraph>
						Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
						ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
						integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
						lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
						Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
						vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
						accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
						Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
						senectus et. Adipiscing elit duis tristique sollicitudin nibh sit. Ornare
						aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
						accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices
						sagittis orci a.
					</Typography>
				</main>
			</div>
		</Header>
	);
}

export default withRouter(ResponsiveDrawer);
