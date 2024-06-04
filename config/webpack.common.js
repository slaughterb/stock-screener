
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const fns = require('./helpers');


const NODE_ENV = process.env.NODE_ENV;
const isProd = (NODE_ENV === 'production');


module.exports = {
	entry: {
		'app': [
			fns.root('client/app/index.js')
		]
	},
	output: {
		path: fns.root('dist'),
		publicPath: '/'
	},
	resolve: {
		extensions: ['.html', '.css', '.scss', '.js', '.json'],
		alias: {
			'app': 'client/app'
		}
	},
	module: {
		rules: [
			{
				test: /\.js$|jsx/,
				include: fns.root('./client'),
				loader: 'babel-loader'
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								'sourceMap': true,
								'importLoaders': 1
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [
									autoprefixer
								]
							}
						}
					]
				})
			},
			{
				test: /\.(png|jpg|webp|gif|svg|mp4)$/,
				use: [
					{	
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]?[hash]',
							context: 'client/public',
						}
					},
					{
						loader: 'webp-loader'
					}
				]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(NODE_ENV)
			}
		}),
		new HtmlWebpackPlugin({
			template: fns.root('client/public/index.html'),
			inject: 'body'
		}),
		new ExtractTextPlugin({
			filename: 'css/[name].[hash].css',
			disable: !isProd
		}),
		new CopyWebpackPlugin([{
			from: fns.root('client/public')
		}])
	]
};