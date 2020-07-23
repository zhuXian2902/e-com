/** @format */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
	heading: {
		// fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
	},
	secondaryHeading: {
		// fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
}));

function AccordionComponent(props) {
	const classes = useStyles();
	const { head } = props;
	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography className={classes.heading}>{head}</Typography>
			</AccordionSummary>
			{/* <AccordionDetails>
          {/* <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography> */}
			{/* </AccordionDetails> */}
		</Accordion>
	);
}

export default AccordionComponent;
