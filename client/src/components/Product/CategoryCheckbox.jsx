/** @format */

import React, { useState } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const CategoryCheckbox = ({ categories, handleFilter }) => {
	const [checked, setChecked] = useState([]);

	const handleChange = (id) => {
		if (!checked.includes(id)) {
			setChecked([...checked, id]);
			handleFilter([...checked, id]);
		} else {
			const newArr = checked.filter((cid) => id !== cid);
			setChecked(newArr);
			handleFilter(newArr);
		}
	};

	return categories.map((category, idx) => (
		<FormControlLabel
			style={{ margin: 0 }}
			key={category._id}
			control={
				<Checkbox
					onChange={() => handleChange(category._id)}
					style={{ padding: 4 }}
				/>
			}
			label={category.name}
		/>
	));
};

export default CategoryCheckbox;
