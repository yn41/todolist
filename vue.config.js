module.exports = {
  // publicPath : '//yn41.github.io/todolist/dist/',
  publicPath: process.env.NODE_ENV === 'production' ? '/todolist/' : '/',
  css: {
    sourceMap: true,
  },
  devServer: {
    proxy: 'http://apis.data.go.kr/'
  }
}
 