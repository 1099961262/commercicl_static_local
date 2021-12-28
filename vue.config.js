const path = require("path");
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== "development";
// 代码压缩---服务器不支持该插件
// const TerserPlugin = require("terser-webpack-plugin");
// gzip压缩
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = {
  devServer: {
    open: true,
    // useLocalIp: true,
    // https: true,
    // hot: true, // 热更新
    // hotOnly: true, // 热更新
    // historyApiFallback: true,
    // inline: true, // 关闭热更新
    proxy: {
      "/auth": {
        target: "https://cqasia.prodb.cn:12136",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  publicPath: process.env.VUE_APP_folder,
  productionSourceMap: false,
  // 解决uglify打包出错问题
  transpileDependencies: ["vue-particles", "animejs"],
  // 生产环境webpack配置
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境批改配置...
      config.mode = "production";
    } else {
      // 为生产环境批改配置...
      config.mode = "development";
    }
    // 生产环境相关配置
    if (isProduction) {
      // gzip压缩
      const productionGzipExtensions = ["html", "js", "css"];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false, // 删除原文件
        })
      );
      // 公共代码抽离
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            vendor: {
              chunks: "all",
              test: /node_modules/,
              name: "vendor",
              minChunks: 1,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 100,
            },
            common: {
              chunks: "all",
              test: /[\\/]src[\\/]js[\\/]/,
              name: "common",
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 60,
            },
            styles: {
              name: "styles",
              test: /\.(le|sc|c)ss$/,
              chunks: "all",
              enforce: true,
            },
            runtimeChunk: {
              name: "manifest",
            },
          },
        },
      };
    }
    // 开发生产独特配置别名
    Object.assign(config.resolve, {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@api": path.resolve(__dirname, "./src/api"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@store": path.resolve(__dirname, "./src/store"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@assets": path.resolve(__dirname, "./src/assets"),
      },
    });
  },

  chainWebpack: (config) => {
    config.resolve.symlinks(true); // 修复热更新失效
    // 移除预请求
    config.plugins.delete("prefetch");
    // 代码预加载--vue内置
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial",
      },
    ]);
    config.optimization.minimize(true); // 压缩代码
    // 分割代码
    config.optimization.splitChunks({
      chunks: "all",
    });
  },
};
