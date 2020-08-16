/** @format */

import React, { useState } from 'react';
import {
	FormControlLabel,
	Radio,
	RadioGroup,
	FormControl,
	FormLabel,
} from '@material-ui/core';

function PriceFilter({ handleFilter }) {
	const Arr = ['price: Low to High', 'price: High to Low', 'Popularity'];

	const [value, setValue] = useState('0');

	const handleChange = (event) => {
		setValue(event.target.value);
		console.log(event.target.value);
		handleFilter(event.target.value);
	};

	return (
		<FormControl style={{ marginTop: '20px' }} component="fieldset">
			<FormLabel component="legend">Order By</FormLabel>
			<RadioGroup name="priceArr" value={value} onChange={handleChange}>
				{Arr.map((name, idx) => (
					<FormControlLabel
						style={{ margin: 0 }}
						key={idx}
						value={`${idx}`}
						label={name}
						control={<Radio style={{ padding: 4 }} />}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
}

export default PriceFilter;
