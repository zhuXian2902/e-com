/** @format */
const AllError = require('../utils/error');
const e = require('express');

const castError = (error) => {
	return new AllError(`invalid ${error.path} : ${error.value}`, 400);
};

const duplicateError = (err) => {
	// console.log(err);
	const val = err.message.match(/"([^"]*)"/); //(/(["'])(\\?.)*?\1/); //

	if (val === 'null') {
		return new AllError(
			`${val[1]} is already taken. Please choose another value`,
			400
		);
	} else {
		return new AllError(`this value already exist in database`, 400);
	}
};

const validationError = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);
	const msg = `invalid input of data : ${errors.join(' ')}`;
	return new AllError(msg, 400);
};

const tokenError = (err) =>
	new AllError('Invalid token! Please login again', 401);

const tokenExpiredError = (err) =>
	new AllError('Token expired! Please login again', 401);

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV === 'production') {
		if (err.name === 'CastError') err = castError(err);
		if (err.code === 11000 || err.code === 11001) err = duplicateError(err);
		if (err.name === 'ValidationError') err = validationError(err);
		if (err.name === 'JsonWebTokenError') err = tokenError(err);
		if (err.name === 'TokenExpiredError') err = tokenExpiredError(err);

		if (err.isOperational) {
			res.status(err.statusCode).json({
				status: err.status,
				message: err.message,
			});
		} else {
			console.log(err);
			res.status(500).json({
				status: 'error',
				message: 'something went wrong',
			});
		}
	} else if (process.env.NODE_ENV === 'development') {
		res.status(err.statusCode).json({
			status: err.status,
			name: err.name,
			error: err,
			message: err.message,
			stack: err.stack,
			message: err.errors,
		});
	}
};
