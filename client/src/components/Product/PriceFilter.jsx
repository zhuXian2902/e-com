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
	const priceArr = [
		[],
		[0, 500],
		[501, 1000],
		[1001, 5000],
		[5001, 10000],
		[10001, 100000],
	];

	const [value, setValue] = useState('0');

	const handleChange = (event) => {
		setValue(event.target.value);

		let lte = 0,
			gte = 100000,
			idx = +event.target.value;
		if (idx > 0) {
			gte = priceArr[idx][0];
			lte = priceArr[idx][1];
		}
		console.log(event.target.value, gte, lte);
		handleFilter(event.target.value, gte, lte);
	};

	return (
		<FormControl style={{ marginTop: '20px' }} component="fieldset">
			<FormLabel component="legend">Price</FormLabel>
			<RadioGroup name="priceArr" value={value} onChange={handleChange}>
				{priceArr.map((price, idx) => (
					<FormControlLabel
						style={{ margin: 0 }}
						key={idx}
						value={`${idx}`}
						label={price[1] ? `₹${price[0]} to ₹${price[1]}` : `All`}
						control={<Radio style={{ padding: 4 }} />}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
}

export default PriceFilter;
