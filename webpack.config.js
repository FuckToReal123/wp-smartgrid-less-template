'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MediaQueryPlugin = require('media-query-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    context: path.resolve(__dirname),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: 'script.min.js'
    },
    externals: ["fs"],
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            reloadAll: true,
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }

                    },
                    {
                        loader: 'group-css-media-queries-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: MediaQueryPlugin.loader,
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    overrideBrowserslist: ['last 2 versions']
                                }),
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
                        filename: 'assets/js/script.js',
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/images/'
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[folder]/[name].[ext]',
                    outputPath: 'assets/fonts/',
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    removeComments: true,
                    minimize: false
                }
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        compress: true,
        port: 8107,
        watchContentBase: true,
        progress: true,
        overlay: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            hash: true,
            minify: false
        }),
        new MiniCssExtractPlugin({
            filename: 'style.min.css'
        }),
        new OptimizeCssAssetsPlugin({
            presets: [
                'default',
                {
                    discardComments: {removeAll: true}
                }
            ]
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ]
};