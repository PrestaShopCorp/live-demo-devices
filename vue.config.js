/* eslint-disable no-param-reassign */
module.exports = {
  configureWebpack: {
    devServer: {
      clientLogLevel: 'warn',
    },
  },
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      definitions[0]['process.env'].MS_DOMAIN = JSON.stringify(process.env.MS_DOMAIN);
      return definitions;
    });
  },
};
