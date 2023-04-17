const path = require('path')

module.exports = {
  mode: 'production',
  devtool: "inline-source-map",
  entry: './bin/grpcmkr.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname, './dist/bin'),
    filename: 'grpcmkr.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
