
import React from 'react';

import StockChart from '../StockChart/StockChart';

import './styles.css';

const StockInfo = (props) => {
	const { data } = props;

	if (data && data.Information && data.Information.includes('rate limit')) {
		return (
			<div className="stockInfoContainer">
				<p className="errMessage">Alphavantage daily rate limit has been reached. Please try again later!</p>
			</div>
		);
	}

	console.log(data);

	const ticker = data['Meta Data']['2. Symbol'];
	const lastRefreshed = data['Meta Data']['3. Last Refreshed'];
	const timezone = data['Meta Data']['5. Time Zone'];


	const dailyData = data['Time Series (Daily)'];
	const candles = [];
	// candleData format: ['1. open', '2. high', '3. low', '4. close', '5. volume']
	for (var date in dailyData) {
		console.log(dailyData);
		const candleData = dailyData[date];

		if (dailyData[date]) {
			candles.push({
				date: new Date(date),
				open: parseFloat(candleData['1. open']),
				high: parseFloat(candleData['2. high']),
				low: parseFloat(candleData['3. low']),
				close: parseFloat(candleData['4. close']),
				volume: parseInt(candleData['5. volume'])
			});
		}
	}

	return (
		<div className="stockInfoContainer">
			<p>Watchlist Ticker - ${ticker}</p>
			<p>Last Refreshed: {lastRefreshed}</p>
			<p>Time Zone: {timezone}</p>
			<br />
			<StockChart candles={candles} />
		</div>
	);
}

export default StockInfo;