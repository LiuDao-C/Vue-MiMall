module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            'api': {
                target: 'http://mall-pre.springboot.cn',
                changeOrigin: true,
                pathRewrite: {
                    'api': ''
                }
            }
        }
    },
    // publicPath:'/app',
    // outputDir:'dest',
    // productionSourceMap:false,  //隐藏项目源码
    // 实现路由按需加载
    chainWebpack: (config) => {
        config.plugins.delete('prefetch');
    }
}