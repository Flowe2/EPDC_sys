module.exports = {
  publicPath: './', // 公共路径(必须有的)
  outputDir: "dist", // 输出文件目录
  assetsDir: "assets", //静态资源文件名称
  lintOnSave: false,
  productionSourceMap: false, //去除打包后js的map文件
  configureWebpack: {
    devtool: 'source-map'
  },
  // devServer: {
  //   open: true,
  //   host: '0.0.0.0',
  //   port: 8080,
  //   proxy: 'http://localhost:3000'
  // },
}