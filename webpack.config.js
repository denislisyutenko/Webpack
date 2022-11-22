const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => ({
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    })

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`;

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: ''
            }
        },
        'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}

const pluginsSet = () => {
    const plugins = [
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'src/favicon.png'),
                        to: path.resolve(__dirname, 'dist')
                    }
                ]
            }),
            new MiniCssExtractPlugin({
                filename: filename('css'),
            }),
            new EslintWebpackPlugin({
                extensions: ['js'],
                fix: true
            })
        ]

        if(isDev) {
            // code
        }
        return plugins
}

const jsLoaders = (extra) => {
    const loaders = {
        loader: "babel-loader",
        options: {
            presets: ['@babel/preset-env']
        }
    }

    if(extra) loaders.options.presets.push(extra)

    return loaders
}

    module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './index.jsx',
        stat: './statistics.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: filename('js'),
    },
    target: 'web',
    devServer: {
        port: 4200,
        hot: false
    },
    devtool: isDev ? 'source-map' : false,
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
        alias: {
            '@model': path.resolve(__dirname, 'src/model'),
            '@css': path.resolve(__dirname, 'src/css'),
            '@assets': path.resolve(__dirname, 'src/assets')
        }
    },
    optimization: optimization(),
    plugins: pluginsSet(),
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /node_modules/,
            use: jsLoaders()
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: jsLoaders('@babel/preset-react')
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: jsLoaders('@babel/preset-typescript')
            },
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpeg|jpg|svg|gif|webp)$/,
                type: 'asset/resource'
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            }
        ]
    }
};

