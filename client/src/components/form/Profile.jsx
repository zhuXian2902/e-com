/** @format */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		height: '3rem',
		padding: '1rem',
	},
}));

function Profile(props) {
	const classes = useStyles();
	const { head } = props;
	return (
		<Paper variant="outlined" className={classes.root} square>
			{head}
		</Paper>
	);
}

export default Profile;
