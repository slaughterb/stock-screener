const request = require('superagent');


module.exports = (app) => {
	// alphavantage / apexcharts endpoint:
	app.post('/api/stock/watchlist', function(req, res, next) {
		const tickers = req.body.tickers || [];

		// alphavantage.co queries:
		const stockData = [];
		const promises = tickers.map(async (ticker) => {
			return request.get('https://alphavantage.co/query').query({
				'function': 'TIME_SERIES_DAILY'
			}).query({
				apikey: process.env.ALPHAVANTAGE_API_KEY
			}).query({
				symbol: ticker
			}).then((response) => {
				stockData.push(response.body);
			});
		});

		Promise.all(promises).then(() => {
			res.send({
				success:true,
				message: 'Stock Watchlist Info',
				stockData
			});
		}).catch((err) => {
			res.send({
				success: false,
				message: 'Could not receive all stock data',
				stockData
			});
		});
	});

	// Finnhub endpoint: 
	app.post('/api/stock/finnhub', function(req, res, next) {
		const finnhubData = [];
		const tickers = req.body.tickers || [];

		const promises = tickers.map(async (ticker) => {
			return request.get(`https://finnhub.io/api/v1/stock/earnings?symbol=${ticker}&token=${process.env.FINNHUB_API_KEY}`).then((response) => {
				finnhubData.push(response.body);
			});
		});

		Promise.all(promises).then(() => {
			res.send({
				success: true,
				message: 'Finnhub Earnings Info',
				finnhubData
			});
		});
	});

	app.post('/api/stock/financial-model-quote', async function(req, res, next) {
		const searchTicker = req.body.searchTicker || '';
		const searchTickerQuote = [];

		return request.get(`https://financialmodelingprep.com/api/v3/profile/${searchTicker}?apikey=${process.env.FMP_API_KEY}`).then((response) => {
			searchTickerQuote.push(response.body[0]);
		}).then((data) => {
			res.send({
				success: true,
				message: 'FMP Stock Profile Quote',
				searchTickerQuote
			});
		}).catch((err) => {
			res.send({
				success: false,
				error: err,
				searchTickerQuote: []
			});
		})
	});

	app.get('/api/stock/sector-overview', async function(req, res, next) {
		const sectorInfo = [];
		return request.get(`https://financialmodelingprep.com/api/v3/sector-performance?apikey=${process.env.FMP_API_KEY}`).then((response) => {
			sectorInfo.push(response.body);
		}).then(() => {
			res.send({
				success: true,
				message: 'FMP Sector Overview',
				sectorInfo
			});
		}).catch((err) => {
			res.send({
				success: false,
				error: err,
				sectorInfo: []
			})
		});
	});

	app.get('/api/stock/top-gainers', async function(req, res, next) {
		const topGainers = [];
		return request.get(`https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${process.env.FMP_API_KEY}`).then((response) => {
			topGainers.push(response.body);
		}).then(() => {
			res.send({
				success: true,
				message: 'FMP Top Stock Gainers',
				topGainers
			});
		}).catch((err) => {
			res.send({
				success: false,
				error: err,
				topGainers: []
			});
		})
	});

	app.get('/api/stock/top-decliners', async function(req, res, next) {
		const topDecliners = [];

		return request.get(`https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=${process.env.FMP_API_KEY}`).then((response) => {
			topDecliners.push(response.body);
		}).then(() => {
			res.send({
				success: true,
				message: 'FMP Top Stock Decliners',
				topDecliners
			});
		}).catch((err) => {
			res.send({
				success: false,
				error: err,
				topDecliners: []
			});
		});
	});
};