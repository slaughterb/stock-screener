
const webpack = require('webpack');
const merge = require('webpack-merge');

const fns = require('./helpers');
const commonConfig = require('./webpack.common');

const crypto = require('crypto');
const crypto_orig_createHash = crypto.createHash;
crypto.createHash = algo => crypto_orig_createHash(algo === 'md4' ? 'sha256' : algo);


module.exports = merge(commonConfig, {
	mode: 'production',
	output: {
		filename: 'js/[name].[hash].js',
		chunkFilename: '[id].[hash].chunk.js',
		hashFunction: 'sha256'
	},
	optimization: {
		minimize: false
	}
});