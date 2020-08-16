/** @format */

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { countUpdate, removeItem } from './../../utils/cartHelpers';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
	root: {
		display: 'inline-flex',
		alignItems: 'center',
		padding: 4,
		borderRadius: 40,
		border: '1px solid',
		borderColor: palette.grey[300],
	},
	iconBtn: {
		padding: 8,
		'& svg': {
			fontSize: 16,
		},
	},
	value: {
		padding: '0px 8px',
	},
	heading: {
		fontWeight: 900,
		fontSize: '1.75rem',
		textAlign: 'center',
		[breakpoints.up('sm')]: {
			textAlign: 'left',
		},
		[breakpoints.up('md')]: {
			fontSize: '2.25rem',
		},
	},
	table: {
		minWidth: 650,
	},
	image: {
		width: '100%',
		height: '100%',
		objectFit: 'contain',
	},
	name: {
		fontFamily:
			'-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
		fontWeight: 'bold',
		fontSize: 16,
		margin: '0 0 8px 0',
	},
	descr: {
		fontSize: 14,
		color: palette.text.secondary,
	},
	btn: {
		width: '100%',
		paddingTop: 16,
		paddingBottom: 16,
		borderRadius: 40,
		border: '1px solid',
		borderColor: palette.grey[400],
		'& > *': {
			fontWeight: 'bold',
			textTransform: 'none',
		},
		marginRight: 72,
		[breakpoints.up('sm')]: {
			marginRight: 'unset',
		},
	},
	big: {
		fontSize: 16,
	},
	large: {
		fontSize: 24,
	},
	mainGrid: {
		[breakpoints.up('sm')]: {
			flexDirection: 'row-reverse',
		},
	},
	root: {
		display: 'inline-flex',
		alignItems: 'center',
		padding: 4,
		borderRadius: 40,
		border: '1px solid',
		borderColor: palette.grey[300],
	},
	iconBtn: {
		padding: 8,
		'& svg': {
			fontSize: 16,
		},
	},
	value: {
		padding: '0px 8px',
	},
}));

const DailyCart = (props) => {
	const styles = useStyles();
	const { setChange, isChange, items } = props;
	const imageUrl = process.env.REACT_APP_SERVER_IMAGE_URL;

	const handleCount = (type, id, val) => {
		console.log(val, id);
		if (type === 'remove') {
			removeItem(id);
		} else {
			if (type === 'increment') {
				val++;
			} else if (type === 'decrement' && val > 1) {
				val--;
			}
			countUpdate(val, id);
		}
		setChange(!isChange);
	};

	return (
		<Box pt={{ xs: 2, sm: 4, md: 6 }}>
			<Typography className={styles.heading} variant={'h1'} gutterBottom>
				Shopping Cart.
			</Typography>
			<TableContainer>
				<Table className={styles.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Product</TableCell>
							<TableCell>Quantity</TableCell>
							<TableCell>Total Price</TableCell>
							<TableCell>&nbsp;</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{items.map((item) => (
							<TableRow key={item._id}>
								<TableCell component="th" scope="row">
									<Box display={'flex'} alignItems={'center'}>
										<Box width={80} height={80}>
											<img
												className={styles.image}
												alt={item.name}
												src={`${imageUrl}/products/${item.image}`}
											/>
										</Box>
										<Box ml={2}>
											<p className={styles.name}>{item.name}</p>
										</Box>
									</Box>
								</TableCell>

								<TableCell>
									<div className={styles.root}>
										<IconButton
											onClick={(e) => handleCount('decrement', item._id, item.count)}
											className={styles.iconBtn}
										>
											<Remove />
										</IconButton>
										<span className={styles.value}>{item.count}</span>
										<IconButton
											onClick={(e) => handleCount('increment', item._id, item.count)}
											className={styles.iconBtn}
										>
											<Add />
										</IconButton>
									</div>
								</TableCell>
								<TableCell>{item.price && item.price * item.count}</TableCell>
								<TableCell>
									<IconButton onClick={(e) => handleCount('remove', item._id)}>
										<Close />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default DailyCart;
