import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import App from './components/App/App';
import ResourceNotFound from './components/App/ResourceNotFound';

import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import FinancialModel from './components/FinancialModel/FinancialModel';

import './styles/styles.css';


ReactDOM.render((
	<Router>
		<App>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="financial-model" element={<FinancialModel />} />
				<Route element={<ResourceNotFound />} />
			</Routes>
		</App>
	</Router>
), document.getElementById('app'));