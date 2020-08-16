/** @format */

export const addItem = (item, next) => {
	let cart = [];
	if (window !== 'undefined') {
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}
		let isItemExist = cart.find((product) => item._id === product._id);
		if (isItemExist) {
			isItemExist.count++;
			cart = [...cart];
		} else {
			cart = [...cart, { ...item, count: 1 }];
		}
		localStorage.setItem('cart', JSON.stringify(cart));
		next();
	}
};

export const totalItems = () => {
	if (window !== 'undefined') {
		if (localStorage.getItem('cart')) {
			let count = 0;
			JSON.parse(localStorage.getItem('cart')).forEach(
				(item) => (count += item.count)
			);
			return count;
		}
		return 0;
	}
	return 0;
};

export const getCartItems = () => {
	if (window !== 'undefined') {
		let obj = {};
		if (localStorage.getItem('cart')) {
			let total = 0;
			const arr = JSON.parse(localStorage.getItem('cart'));
			arr.forEach((item) => (total += item.count * item.price));
			return [arr, total];
		}
		return [[], 0];
	}
	return [[], 0];
};

export const countUpdate = (val, id) => {
	if (window !== 'undefined') {
		let cart = [];
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}
		const newArr = cart.map((item, idx) => {
			if (item._id === id) {
				return { ...item, count: val };
			}
			return item;
		});
		localStorage.setItem('cart', JSON.stringify(newArr));
	}
};

export const removeItem = (id) => {
	if (window !== 'undefined') {
		let cart = [];
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}
		const newArr = cart.filter((item, idx) => {
			if (item._id !== id) {
				return item;
			}
		});
		localStorage.setItem('cart', JSON.stringify(newArr));
	}
};

export const emptyCart = (next) => {
	if (window !== 'undefined') {
		localStorage.removeItem('cart');
		next();
	}
};
