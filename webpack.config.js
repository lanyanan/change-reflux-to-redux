const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const entryfile = process.env.NODE_EVN === "redux" ? './src/reduxApp/js/index.js' : './src/refluxApp/js/index.js';

const pathfile = process.env.NODE_EVN + 'App';

module.exports = {
	entry: entryfile,
	output: {
	    filename: '[name].bundle.js',
	    path: path.resolve(__dirname, 'dist'),
	    chunkFilename: '[name].bundle.js',
	 },
	plugins: [
		new CleanWebpackPlugin(['dist']),
	    new HtmlWebpackPlugin({
	        title: 'Output Management',
	        filename: 'index.html',
	        template: 'src/' + pathfile + '/page/index.html'
	    }),
	    new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, ""),
        hot: true
    },
    module: {
	    rules: [
	    	{
			    test: /\.js$/,
			    exclude: /node_modules/,
			    use: {
			      	loader: 'babel-loader',
			        query: {
                        presets: ['es2015','stage-0', 'react' ]
                	}
			    }
			},
	        {
	         test: /\.css$/,
	         use: [
	           'style-loader',
	           'css-loader'
	         ]
	        },
	        {
	        	test: /\.(png|svg|jpg|gif)$/,
	            use: [
	           		'file-loader'
	         	]
	        },
	        {
	            test: /\.(woff|woff2|eot|ttf|otf)$/,
	            use: ['file-loader']
	        },
	     ]
	   }
};