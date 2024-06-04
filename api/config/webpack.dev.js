
const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
	devtool: 'eval-source-map',
	mode: 'development',
	entry: {
		'app': [
			'webpack-hot-middleware/client?reload=true'
		]
	},
	output: {
		filename: 'js/[name].js',
		chunkFilename: '[id].chunk.js'
	},
	devServer: {
		contentBase: '../client/public',
		historyApiFallback: true,
		stats: 'normal',
	}
});