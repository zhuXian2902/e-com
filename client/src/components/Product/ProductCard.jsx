/** @format */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	cardGrid: {
		paddingTop: theme.spacing(8),
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

function ProductCard() {
	const classes = useStyles();
	return (
		<div>
			<Card className={classes.card}>
				<CardActionArea>
					<CardMedia
						className={classes.cardMedia}
						component="img"
						alt="Contemplative Reptile"
						height="200"
						image="data:image/jpeg;base64,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"
						title="Contemplative Reptile"
					/>
					<CardContent className={classes.cardContent}>
						<Typography gutterBottom variant="h5" component="h2">
							Lizard
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							Lizards are a widespread group of squamate reptiles, with over 6,000
							species, ranging across all continents except Antarctica
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size="small" color="primary">
						Share
					</Button>
					<Button size="small" color="primary">
						Learn More
					</Button>
				</CardActions>
			</Card>
		</div>
	);
}

export default ProductCard;
