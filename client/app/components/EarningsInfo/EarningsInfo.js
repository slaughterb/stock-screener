
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import './styles.css';


const EarningsInfo = (props) => {
	const { data } = props;

	if (!data || data.length === 0) {
		return (<p>Finnhub could not retrieve stock data for the provided ticker.</p>);
	}

	const ticker = data[0]['symbol'];

	return (
		<div>
			<h3 className="earningsContainer">Watchlist Earnings Info for {ticker}: </h3>
			{data.map((quartile, i) => (
				<div key={uuidv4()}>
					<hr />
				    <p>Time of report: quarter {data[i]['quarter']} of year {data[i]['year']} </p>
					<p>Actual EPS: {data[i]['actual']}, Estimated EPS: {data[i]['estimate']}</p>
					<p>Surprise: {data[i]['surprise']}%</p>
					<hr />
				</div>
			))}
		</div>
	);
}

export default EarningsInfo;