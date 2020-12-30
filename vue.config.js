// let outputDir = '../youtube-party-server/public';
if (process.env.VUE_APP_MODE !== 'develop') {
  module.exports = {
    publicPath: '/public/',
    outputDir: '../youtube-party-server/public',
  };
} else {
  module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://www.utubeparty.com/',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '',
          },
        },
      },
    },
  };
}
