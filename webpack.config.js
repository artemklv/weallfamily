let path = require('path');

module.exports = {
  context: __dirname,
  entry:  ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  plugins: [],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
    ]
  }
}