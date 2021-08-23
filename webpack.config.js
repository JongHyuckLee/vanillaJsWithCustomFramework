const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


const BUILD_DIR = 'dist'

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, BUILD_DIR),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|pages)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',
                        options: { import: true },
                    },
                ],
            },
            {
                test: /\.png$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({ template: './public/index.html' }), new MiniCssExtractPlugin(),   new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: [BUILD_DIR]
    })],
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, BUILD_DIR),
        compress: true,
        hot: false,
        historyApiFallback: true,
        liveReload: true,
        open: true,
        port: 5500,
        watchContentBase: true,
        watchOptions: {
            poll: 1000,
            ignored: /node_modules/,
        },
    },
};
