/** @format */

import React from 'react';
import axios from 'axios';
import Routes from './routes/Routes';
import { getCookie, signout } from './utils/helpers';
import './all.css';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.interceptors.request.use((config) => {
	// console.log(config);
	const token = getCookie('token');
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

// null for success, and second parameter callback for failure
axios.interceptors.response.use(null, (error) => {
	if (error.response.status === 401) {
		signout(() => {
			window.location.href = '/signin';
		});
	}

	return Promise.reject(error);
});

function App() {
	return <Routes />;
}

export default App;
