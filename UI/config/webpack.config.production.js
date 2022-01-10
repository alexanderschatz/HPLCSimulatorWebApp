const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')
dotenv.config()

const outputDirectory = '../dist'
const publicPath = process.env.PUBLIC_PATH || '/'

const ENVIRONMENT = {
	API_ENDPOINT: process.env.API_ENDPOINT,
}

module.exports = {
	entry: ['./src/index.js'],
	output: {
		path: path.join(__dirname, outputDirectory),
		filename: '[name].[contenthash].js',
		publicPath,
	},
	devtool: 'source-map',
	target: 'web',
	mode: 'production',
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000',
			},
			{
				test: /(\.css|\.scss|\.sass)$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [require('cssnano'), require('autoprefixer')],
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							includePaths: [path.resolve(__dirname, 'src', 'scss')],
							sourceMap: true,
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './public/index.html',
			favicon: './public/favicon.ico',
		}),
		new webpack.EnvironmentPlugin(ENVIRONMENT),

		// // Generate an external css file with a hash in the filename
		// new MiniCssExtractPlugin({
		//   filename: '[name].[contenthash].css'
		// }),
	],
}
