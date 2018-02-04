const path = require('path');
const webpack = require('webpack');


module.exports = {
	entry: './src/js/index.js',
	output: {
	    filename: 'index.[hash].js',
	    path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
	        compress: true
	    })
    ],
};