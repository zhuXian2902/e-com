/**
 * /* eslint-disable max-len
 *
 * @format
 */

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Card, Button } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { addItem } from './../../utils/cartHelpers';
import { Link, Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const toastOptions = {
	position: 'top-center',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: false,
	draggable: false,
	progress: undefined,
};

const EngagementCard01 = ({ product }) => {
	const [redirect, setRedirect] = React.useState(false);
	// const classes = useStyles();
	const imageUrl = process.env.REACT_APP_SERVER_IMAGE_URL;
	const url = `${imageUrl}/products/${product.image}`;

	const addToCart = () => {
		addItem(product, () => {
			toast.success('item added to cart successfully', toastOptions);
			setRedirect(true);
		});
	};

	if (redirect) {
		return <Redirect to="/cart" />;
	}

	return (
		<Card className={'MuiEngagementCard--01'}>
			<CardMedia className={'MuiCardMedia-root'} image={url} />
			<CardContent className={'MuiCardContent-root'}>
				<Typography
					className={'MuiTypography--heading'}
					variant={'h6'}
					gutterBottom
				>
					{product.name.toUpperCase()}
				</Typography>
				<Typography className={'MuiTypography--subheading'} variant={'caption'}>
					{product.description.substring(0, 30)}
				</Typography>
				<br />
				<Typography className={'MuiTypography--subheading'} variant={'caption'}>
					Price ₹{product.price}
				</Typography>
				<Divider className={'MuiDivider-root'} light />
				<Button
					style={{ marginRight: '10px' }}
					onClick={addToCart}
					variant="contained"
					size="small"
					color="primary"
				>
					Add to Cart
				</Button>

				<Link to={`/products/${product._id}`} style={{ underline: 'none' }}>
					<Button variant="contained" size="small" color="primary">
						View Details
					</Button>
				</Link>
			</CardContent>
		</Card>
	);
};

EngagementCard01.getTheme = (muiBaseTheme) => ({
	MuiCard: {
		root: {
			'&.MuiEngagementCard--01': {
				transition: '0.3s',
				maxWidth: 400,
				margin: 'auto',
				boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
				'&:hover': {
					boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
				},
				'& .MuiCardMedia-root': {
					paddingTop: '56.25%',
					height: '270px',
				},
				'& .MuiCardContent-root': {
					textAlign: 'left',
					padding: muiBaseTheme.spacing(3),
				},
				'& .MuiDivider-root': {
					margin: `${muiBaseTheme.spacing(3)}px 0`,
				},
				'& .MuiTypography--heading': {
					fontWeight: 'bold',
					lineHeight: 1,
				},
				'& .MuiTypography--subheading': {
					lineHeight: 1,
					fontSize: '18px',
				},
				'& .MuiAvatar-root': {
					display: 'inline-block',
					border: '2px solid white',
					'&:not(:first-of-type)': {
						marginLeft: -muiBaseTheme.spacing.unit,
					},
				},
			},
		},
	},
});

export default EngagementCard01;
