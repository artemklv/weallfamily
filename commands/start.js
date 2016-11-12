let config = require('../webpack.config')
let webpack =  require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
var WebpackDevServer = require('webpack-dev-server')

process.env.NODE_ENV = 'development'
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  __DEV__: false
}

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
config.devtool = 'source-map'

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: false,
  historyApiFallback: true,
  quiet: true
}).listen(3000, 'localhost', function (error, stats) {
  if (error) { // so a fatal error occurred. Stop here.
    console.log(error)
    return 1
  }
  console.log('development server run at http://localhost:3000')
})
