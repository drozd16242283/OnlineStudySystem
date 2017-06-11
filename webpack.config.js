const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const ENTRY_DIR = `${__dirname}/app/client`
const OUTPUT_DIR = `${__dirname}/app/public/build`

let plugins = [
	new webpack.NoErrorsPlugin(),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false,
			drop_console: true,
		    unsafe: true
		}
	}),
	new ExtractTextPlugin('[name].css')
]

module.exports = {
	context: ENTRY_DIR,
	entry: {
		index: './index',
		admin: './admin',
		teacher: './teacher'
	},
	resolve: {
		root: `${__dirname}/app`,
		modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
	},
	plugins,
	output: {
		path: OUTPUT_DIR,
		publicPath: '/',
		filename: '[name].bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/,	loader: 'babel', exclude: [/node_modules/] },
	 		{ test: /\.js?$/,	loader: 'babel', exclude: [/node_modules/] },
			{
			   test: /\.css$/,
			   loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
		   },
		   { test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
		   { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
		   { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
		   { test: /\.svg/,  loader: 'url-loader?limit=26000&mimetype=image/svg+xml' },
		   { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1' },
		   { test: /\.json$/, loader: 'json-loader' }
		]
	}
}
