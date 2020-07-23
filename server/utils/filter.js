/** @format */

class Filter {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	filter() {
		// console.log(this.queryString);
		const queryDest = { ...this.queryString };
		const excludeFields = ['limit', 'sort', 'page', 'field'];
		excludeFields.forEach((field) => delete queryDest[field]);
		let queryStr = JSON.stringify(queryDest);
		queryStr = queryStr.replace(/\b(ne|gte|lte|gt|lt)\b/g, (el) => `$${el}`);
		const queryObj = JSON.parse(queryStr);
		this.query = this.query.find(queryObj);
		// console.log(this.query, this.queryString);
		return this;
	}

	sort() {
		let sortBy = this.queryString.sort
			? this.queryString.sort.split(',').join(' ')
			: '-createdAt';
		this.query = this.query.sort(sortBy);
		return this;
	}

	limit() {
		let field = this.queryString.field
			? this.queryString.field.split(',').join(' ')
			: '-__v';
		this.query = this.query.select(field);
		return this;
	}

	pagination() {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 11;
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);

		return this;
	}
}

module.exports = Filter;
