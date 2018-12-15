const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/js/index.js',
  mode: 'development',
  stats: { children: false },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'js/bundle.js?[hash]'
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true,
            attrs: ['img:src', 'partial:src']
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'minify',
            [ '@babel/env', { 'targets': { 'browsers': [ 'last 2 versions' ] }, useBuiltIns: 'usage', modules: false } ]
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? 'style-loader' : 'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [{
          loader: isProduction ? 'style-loader' : 'css-hot-loader'
        }, {
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          outputPath: 'img'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: "styles/bundle.css?[hash]"
    }),
    new webpack.ProvidePlugin({
      $: 'jquery/dist/jquery.slim',
      jQuery: 'jquery/dist/jquery.slim'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['*', '.js', '.json']
  }
};

if (!isProduction) {
  module.exports.devServer = {
    contentBase: './dist',
  }
}
