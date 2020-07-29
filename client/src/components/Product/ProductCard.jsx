/** @format */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
// import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	cardGrid: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '0%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
}));

function ProductCard({ product }) {
	const classes = useStyles();
	const imageUrl = process.env.REACT_APP_SERVER_IMAGE_URL;
	const url = `${imageUrl}/products/${product.image}`;
	return (
		<div>
			<Card className={classes.card}>
				<CardActionArea to="/dashboard">
					<CardMedia
						className={classes.cardMedia}
						component="img"
						alt="Contemplative Reptile"
						height="200"
						image={url}
						title="Contemplative Reptile"
					/>
				</CardActionArea>
				<CardContent className={classes.cardContent}>
					<Typography gutterBottom variant="h5" component="h2">
						{product.name}
					</Typography>
					<Typography
						height="20px"
						variant="body2"
						color="textSecondary"
						component="p"
					>
						{product.description.substring(0, 30)}.....
					</Typography>
				</CardContent>

				<CardActions>
					<Link to="/admindashboard" style={{ underline: 'none' }}>
						<Button variant="contained" size="small" color="primary">
							Add to Cart
						</Button>
					</Link>
					<Link to="/" style={{ underline: 'none' }}>
						<Button variant="contained" size="small" color="primary">
							View Details
						</Button>
					</Link>
				</CardActions>
			</Card>
		</div>
	);
}

export default ProductCard;
