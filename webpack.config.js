const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/main.js',
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, "./dist"),
		filename: "bundle.js"
	},
	devServer: {
		contentBase: './dist',
		compress: true,
		port: 9000
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 're-mobx',
			template: './src/index.html'
		}),
	],
};