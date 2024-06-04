
require('dotenv').config();

const path = require('path');
const fs = require('fs');

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const mongoose = require('mongoose');
const historyApiFallback = require('connect-history-api-fallback');

const config = require('./config/config');
const webpackConfig = require('./webpack.config');

const PORT = process.env.PORT || 8080;
const inDevelopment = process.env.NODE_ENV !== 'production';


// Config & middleware/db(?) setup: 
// mongoose.connect(config.db);
// mongoose.Promise = global.Promise;


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes')(app);

if (inDevelopment) {
	const compiler = webpack(webpackConfig);

	app.use(historyApiFallback({ verbose: false }));


	app.use(webpackDevMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath,
		contentBase: path.resolve(__dirname, '../client/public'),
		stats: {
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false
		}
	}));

	console.log(path.resolve(__dirname, '../dist'));

	app.use(webpackHotMiddleware(compiler));
	app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
	app.use(express.static(path.resolve(__dirname, '../dist')));
	app.get('*', function(req, res) {
		res.sendFile(path.resolve(__dirname, '../dist/index.html'));
		res.end();
	});
}


app.listen(PORT, (err) => {
	if (err) {
		console.log(err);
		return;
	}
	console.info(`--> Running at http://localhost:${PORT}/`);
});

module.exports = app;







