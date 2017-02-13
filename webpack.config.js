'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  devtool: 'eval-source-map',
  // entry: {
  //   'index':[
  //   'webpack-hot-middleware/client?reload=true',
  //   path.join(__dirname, 'src/index.js')
  // ]},
  entry: {
    'index': ['./src/index.js']
  },
  resolve: {
    extensions: ['.js', '.html']
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  // plugins: [
  //   new HtmlWebpackPlugin(
  //     {
  //     template: './index.tpl.html',
  //     inject: 'body',
  //     filename: 'index1.html'
  //   }
  //   ),
  //   new webpack.optimize.OccurrenceOrderPlugin(),
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoErrorsPlugin(),
  //   new webpack.DefinePlugin({
  //     'process.env.NODE_ENV': JSON.stringify('development')
  //   })
  // ],
  module: {
    rules: [{
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'svelte-loader'
      }
    ]
  },
  devtool: 'inline-source-map'
};



// module.exports = {
//   devtool: 'eval-source-map',
//   entry: [
//     'webpack-hot-middleware/client?reload=true',
//     path.join(__dirname, 'app/main.js')
//   ],
//   output: {
//     path: path.join(__dirname, '/dist/'),
//     filename: '[name].js',
//     publicPath: '/'
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: 'app/index.tpl.html',
//       inject: 'body',
//       filename: 'index.html'
//     }),
//     new webpack.optimize.OccurrenceOrderPlugin(),
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoErrorsPlugin(),
//     new webpack.DefinePlugin({
//       'process.env.NODE_ENV': JSON.stringify('development')
//     })
//   ],
//   module: {
//     loaders: [{
//       test: /\.jsx?$/,
//       exclude: /node_modules/,
//       loader: 'babel',
//       query: {
//         "presets": ["react", "es2015", "stage-0", "react-hmre"]
//       }
//     }, {
//       test: /\.json?$/,
//       loader: 'json'
//     }, {
//       test: /\.css$/,
//       loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
//     }]
//   }
// };