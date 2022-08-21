const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  // 基础路径
  publicPath: './',
  // 输出目录
  // outputDir: process.env.outputDir,
  outputDir: 'docs',
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

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('svg-sprite-loader').loader('svg-sprite-loader').options({
      symbolId: 'icon-[name]'
    })

  },
  configureWebpack(config) {
    if (process.env.NODE_ENV !== 'development') {
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/css/*.less')] //填写公共文件路径
    }
  }
}
