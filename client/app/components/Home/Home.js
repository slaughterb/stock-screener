
import React from 'react';
import { Link } from 'react-router-dom'

import './styles.css';


const Home = () => {

	return (
		<div className="pageContainer">
			<h1>Stock Screener</h1>
			<p>You can use the Dashboard navigation to generate a watchlist and display earnings information / daily chart data for the specified stock tickers.
			You'll also be able to look up recent earnings reports by querying the Finnhub.io API for recent quarterly report information.</p>
			<div>
				<p>
					<Link to="/dashboard">View Dashboard</Link>
				</p>
			</div>
			<p>Additionally, you may view the stock screener portion of this website that utilizes the Financial Model Prep API to gather
			fundamental data for specified stocks and additionally screen for certain specified criteria. You can check out the screening
			results using the redirect below!</p>
			<div>
				<p>
					<Link to="/financial-model">Financial Model Screener</Link>
				</p>
			</div>
		</div>
	);
}

export default Home;