/** @format */
const Category = require('./../models/categoryModel');
const AllError = require('./../utils/error');

exports.getAllCategory = async (req, res, next) => {
	const data = await Category.find();
	res.status(200).json({
		status: 'success',
		data,
	});
};

exports.createCategory = async (req, res, next) => {
	// console.log(req.body);

	// const result = await Category.find(req.body);
	// console.log(result);
	const data = await Category.create(req.body);

	res.status(201).json({
		status: 'success',
		data,
	});
};

exports.getCategory = async (req, res, next) => {
	const data = await Category.findById(req.params.cid);
	if (!data) {
		return next(new AllError('Category not found', 404));
	}

	res.status(200).json({
		status: 'success',
		data,
	});
};

exports.updateCategory = async (req, res, next) => {
	const data = await Category.findByIdAndUpdate(req.params.cid, req.body, {
		new: true,
		runValidators: true,
	});
	if (!data) {
		return next(new AllError('Category not found', 404));
	}

	res.status(200).json({
		status: 'success',
		data,
	});
};

exports.deleteCategory = async (req, res, next) => {
	const data = await Category.findByIdAndRemove(req.params.cid);
	if (!data) {
		return next(new AllError('Category not found', 404));
	}

	res.status(204).json({
		status: 'success',
		data: null,
	});
};
