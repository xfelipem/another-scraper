// webpack.config.js
const webpack = require('webpack');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: "./another-scraper.js"
    },
    devServer: {
        historyApiFallback: false
    },
    devtool: 'env',
    node: {
        fs: 'empty'
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "es2015"
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("development")
                //NODE_ENV: JSON.stringify('production')
            }
        })   //, new webpack.optimize.UglifyJsPlugin()
    ]
};
