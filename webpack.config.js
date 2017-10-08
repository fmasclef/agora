const packagejson =  require('./package.json');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');

const PATHS = {
  app: path.join(__dirname, 'app/js'),
  style: path.join(__dirname, 'app/sass'),
  dist: path.join(__dirname, 'dist'),
};

module.exports = {

  entry: {
    app: path.join(PATHS.app, 'bootloader.js'),
  },

  output: {
    path: PATHS.dist,
    filename: '[name].[hash:8].js',
    crossOriginLoading: 'anonymous',
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(sass|scss)$/, loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']) }
    ],
  },

  plugins: [
    new CleanWebpackPlugin(PATHS.dist),
    new CopyWebpackPlugin([
      { from: 'images', to: 'images' }
    ]),
    new ExtractTextPlugin({
      filename: '[name].[hash:8].css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      appMountId: 'app',
      favicon: 'images/favicon.ico',
      template: '!!pug-loader!app/index.pug',
      title: packagejson.name,
    }),
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: process.env.NODE_ENV === 'production',
    }),
  ],

};
