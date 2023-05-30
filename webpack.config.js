const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const devMode = process.env.NODE_ENV !== 'production';
const devTool = devMode ? 'source-map' : undefined;
const target = devMode ? 'web' : 'browserslist';

module.exports = {
    mode: devMode ? 'development' : 'production',
    target: target,
    devtool : devTool,
    devServer: {
        port: 3000,
        open: false,
        hot: true,
        historyApiFallback: true,
        headers: {'Access-Control-Allow-Origin': '*'}
    },
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.js')],
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        clean: true,
        filename: devMode ? 'js/build_main.[contenthash:10].js' : 'js/build_main.min.js',
        assetModuleFilename: 'assets/[name][ext]'
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            inject: 'body',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? 'css/build_main.[contenthash:10].css' : 'css/build_main.min.css'
        }),
        new CopyPlugin({
            patterns: [
                { from: "netlify" }
            ],
        }),
        require("@import-meta-env/unplugin").webpack({
            env: ".env",
            example: ".env.example",
        }),
        // new BundleAnalyzerPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 
                    {
                        loader: "css-loader",
                        // options: {
                        //     importLoaders: 2,
                        //     modules: {
                        //         localIdentName: '[name]__[local]--[hash:base64:7]'
                        //     }
                        // }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [require('postcss-preset-env')]
                            }
                        }
                    },
                    'sass-loader'
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/i,
                type: 'asset/resource',
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 80
                            }
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: ['/node_modules/'],
                use: 
                {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', 'scss', 'css'],
    }
}