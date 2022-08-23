const path = require('path')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  // 基础路径
  publicPath: './',
  // 输出目录
  outputDir: process.env.outputDir,
  // 资源目录
  // assetsDir: "static",
  productionSourceMap: false,
  chainWebpack(config) {
    const alias = config.resolve.alias
    alias.
      set('@$', resolve('src')).
      set('assets', resolve('src/assets')).
      set('components', resolve('src/components')).
      set('utils', resolve('src/utils'))

    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module.
      rule('icons').
      test(/\.svg$/).
      include.add(resolve('src/icons')).
      end().
      use('svg-sprite-loader').
      loader('svg-sprite-loader').
      options({
        symbolId: 'icon-[name]'
      }).
      end()
  },
  configureWebpack() {
    if (process.env.NODE_ENV !== 'development') {
      // config.plugins.push(
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       warnings: false,
      //       compress: {
      //         drop_debugger: true,
      //         drop_console: true,
      //         pure_funcs: ['console.log']
      //       }
      //     },
      //     sourceMap: false,
      //     parallel: true
      //   })
      // )
    }
  }
}
