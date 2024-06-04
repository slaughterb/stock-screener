
const webpack = require('webpack');
const merge = require('webpack-merge');

const fns = require('./helpers');
const commonConfig = require('./webpack.common');


module.exports = merge(commonConfig, {
	mode: 'production',
	output: {
		filename: 'js/[name].[hash].js',
		chunkFilename: '[id].[hash].chunk.js'
	},
	optimization: {
		minimize: false
	}
});