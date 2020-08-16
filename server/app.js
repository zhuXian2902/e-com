/** @format */

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const orderRouter = require('./routes/orderRoutes');
const Product = require('./models/productModel');
const AllError = require('./utils/error');
const errorHandler = require('./controllers/errorController');
const cors = require('cors');
const path = require('path');

const DB = process.env.DATABASE;
// console.log(process.env);
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then((con) => {
		console.log('database connected');
	})
	.catch(() => {
		console.log('server is down');
	});

// middleware
if (process.env.NODE_ENV === 'production') {
	app.use(morgan('dev'));
	// app.use(cors({ optionsSuccessStatus: 200, origin: '*' }));
	app.use(cors());
} else {
	app.use(morgan('dev'));
	app.use(cors());
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '1000kb' }));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);

app.all('*', (req, res, next) => {
	// const err = new Error(`${req.originalUrl} not found`);
	// err.status = 'fail';
	// err.statusCode = 404;
	next(new AllError(`${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});
