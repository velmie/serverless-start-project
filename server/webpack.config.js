const path = require('path');
const slsw = require('serverless-webpack');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

console.log('web');
module.exports = {
  entry: slsw.lib.entries,
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.ts',
      '.tsx'
    ],
    plugins: [
      new TsConfigPathsPlugin(/* { configFileName, compiler } */)
    ],
    alias: {
      'pg-native': path.join(__dirname, '../shared/coreFix/pg/pgNative.js'),
    }
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      { test: /\.ts(x?)$/, loader: 'awesome-typescript-loader' },
    ],
  },
};
