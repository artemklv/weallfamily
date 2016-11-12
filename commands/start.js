let config = require('../webpack.config')
let webpack =  require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
var WebpackDevServer = require('webpack-dev-server')

// add plugins
config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: 'src/index.html'
  })
])

// add hot module replacement
config.entry = ['webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server'].concat(config.entry)

// add source map
config.devtool = 'cheap-eval-source-map'

// run dev server
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: false,
  historyApiFallback: true,
  quiet: true
}).listen(3000, 'localhost', function (error, result) {
  if (error) {
    console.log(error)
  }
  console.log('development serve run at http://localhost:3000!')
})
