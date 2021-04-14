module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: 'http://localhost:3000'
  },
}