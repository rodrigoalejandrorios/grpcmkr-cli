const path = require('path');

module.exports = {
  target: 'node',
  entry: {
    index: './bin/grpcmkr.ts',
  },
  output: {
    path: path.resolve(__dirname, './dist/bin'),
    filename: 'grpcmkr.js',
    library: 'grpcmkr-cli',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
};
