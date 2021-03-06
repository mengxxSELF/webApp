var path = require('path');

//->import plugins
var openBrowserWebpackPlugin = require('open-browser-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'),
    webpack = require('webpack');

//->config
module.exports = {
    entry: {
        'build': path.resolve('src/build.js')
    },
    output: {
        path: path.resolve('build'),
        filename: '[name].min.js'
    },
    devServer: {
        port: 9090,
        contentBase: './build',
        inline: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "webApp",
            template: "./src/index.html",
            filename: "index.html",
            chunks: ['build']
        }),
        new openBrowserWebpackPlugin({url: 'http://localhost:9090/index.html'}),
        new ExtractTextWebpackPlugin("[name].min.css"),
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
        new webpack.optimize.MinChunkSizePlugin({compress: {warnings: false}}),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin({minSizeReduce: 1.5, moveToParents: true})
    ],
    module: {
        loaders: [
            {
                test: /\.js$/i,
                loader: "babel",
                exclude: /node_modules/
            },
            {
                test: /\.less$/i,
                loader: ExtractTextWebpackPlugin.extract('style-loader', 'css-loader!less-loader')
            },
            {
                test: /\.css/i,
                loader: ExtractTextWebpackPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.(png|gif|jpg|ico|woff|woff2|ttf|svg|eot)$/i,
                loader: "url?limit=102400"
            }
        ]
    }
};