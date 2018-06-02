const packagejson =  require('./package.json');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SriPlugin = require('webpack-subresource-integrity');

const PATHS = {
  app: path.join(__dirname, 'app/js'),
  style: path.join(__dirname, 'app/sass'),
  dist: path.join(__dirname, 'dist'),
};

module.exports = (env, argv) => {
    return {

    entry: {
      app: path.join(PATHS.app, 'bootloader.js'),
    },

    output: {
      path: PATHS.dist,
      filename: '[name].[hash:8].js',
      crossOriginLoading: 'anonymous',
    },

    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, use : { loader: 'babel-loader' } },
        { test: /\.(sass|scss)$/, use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { minimize: argv.mode === 'production' } },
          { loader: "sass-loader" },
        ]},
        { test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          use: { loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '../fonts'
            }
          }
        }
      ],
    },

    plugins: [
      new CleanWebpackPlugin(PATHS.dist),
      new CopyWebpackPlugin([
        { from: 'images', to: 'images' }
      ]),
      new HtmlWebpackPlugin({
        appMountId: 'app',
        favicon: 'images/favicon.ico',
        template: '!!pug-loader!app/index.pug',
        title: packagejson.name,
        injectExtras: {
          head: [
          ]
        }
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[hash:8].css",
        chunkFilename: "[id].css"
      }),
      new SriPlugin({
        hashFuncNames: ['sha256', 'sha384'],
        enabled: argv.mode === 'production',
      }),
    ]

  }
}
