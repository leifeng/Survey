var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/admin.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            loaders: ['style', 'css']
        },
        {
            test:/\.scss$/,
            loaders:['style','css','sass']
        }
        ]
    }
};