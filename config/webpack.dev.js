
const webpack = require('webpack');
const merge = require('webpack-merge');


const crypto = require('crypto');
const crypto_orig_createHash = crypto.createHash;
crypto.createHash = algo => crypto_orig_createHash(algo === 'md4' ? 'sha256' : algo);

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
		chunkFilename: '[id].chunk.js',
		hashFunction: 'sha256',
	},
	devServer: {
		contentBase: './client/public',
		historyApiFallback: true,
		stats: 'normal',
	}
});