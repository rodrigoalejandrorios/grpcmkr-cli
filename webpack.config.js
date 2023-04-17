const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: './bin/grpcmkr.ts',
  mode:'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dd'),
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
  },
  externals: [nodeExternals()],
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
  },
};
