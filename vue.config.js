// vue.config.js file to be place in the root of your repository

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',

  transpileDependencies: [
    'vuetify',
  ],
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        // eslint-disable-next-line no-param-reassign
        args[0].title = 'Maldestor95';
        return args;
      });
  },
};
