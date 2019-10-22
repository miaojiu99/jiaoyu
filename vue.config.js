module.exports = {
  publicPath: "./", //打包后可以在本地打开
  outputDir: "jiaoyu",
  assetsDir: "html",
  productionSourceMap: false, //，系统就不会自动生成 map文件了
  devServer: {
    port: 8080, // 端口号
    // host: "192.168.0.106",
    open: true //浏览器自动打开页面
  }
};
