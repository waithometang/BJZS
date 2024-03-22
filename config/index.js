'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      "/ybm/api/*": {    //需要代理的路径
        // target: "http://apiGmt.znzwoa.com:80",  //需要代理的域名 配合 // 阿斌
        // target: "http://gmt.gaoming.gov.cn",  //需要代理的域名 配合 // 高明
        // target: "http://gmt.znzwoa.com/", // 厚实软件233
        // target: "http://localhost:8850/",  //教育局
        // target: "http://192.168.0.68:8850",  //厚实公司 斌
        // target: "http://192.168.2.102:8848/",  //厚实公司 斌
        // target: "http://192.168.0.164:8000/bjzsapi", // 胡工
        // target: "http://192.168.0.198:8850", // 阿乐
        // target: "http://hujwhome.znzwoa.com/bjzsapi", // 胡工
        target: "http://bjzs.znzwoa.com", // 胡工

        changeOrigin: true  //必须配置为true，才能正确代理
      },
      "/api/*": {    //需要代理的路径
        // target: "http://gmt.gaoming.gov.cn",  //需要代理的域名 配合 // 高明
        // target: "http://gmt.znzwoa.com/", // 厚实软件233
        // target: "http://apiGmt.znzwoa.com:80",  //需要代理的域名 配合 // 阿斌
        // target: "http://localhost:8850/",  //教育局
        // target: "http://192.168.0.68:8848,  //厚实公司 斌
        // target: "http://192.168.2.102:8848/",  //厚实公司 斌
        // target: "http://hujwhome.znzwoa.com/bjzsapi", // 胡工
        target: "http://bjzs.znzwoa.com", // 胡工
        // target: 'http://192.168.0.198:8850',
        changeOrigin: true  //必须配置为true，才能正确代理
      },
      "/files/*": {    //需要代理的路径
        // target: "http://192.168.0.68:8848",  //需要代理的域名 配合 // 阿斌
        // target: "http://192.168.0.199:8848/", // 阿乐
        // target: "http://gmt.gaoming.gov.cn",  //需要代理的域名 配合 // 高明
        // target: "http://gmt.znzwoa.com/", // 测试
        target: "http://bjzs.znzwoa.com/", // 预报名
        changeOrigin: true  //必须配置为true，才能正确代理
      },
    },

    // Various Dev Server settings
    host: '127.0.0.1', // can be overwritten by process.env.HOST
    port: 8898, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: false
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
