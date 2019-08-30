'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        filename: 'script.js',
        publicPath: 'dist/assets',
        path: __dirname + '/dist'
    },
    externals: ["fs"],
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }

                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    overrideBrowserslist: ['last 10 versions']
                                })
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        },
                    }
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                }
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        compress: true,
        port: 8107,
        watchContentBase: true,
        progress: true
    },
    plugins: [
        new HtmlWebpackPlugin({template: './dist/index.html'})
    ]
};