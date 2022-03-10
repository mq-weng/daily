const path = require('path');
module.exports = {
  devServer: {},
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': path.join(__dirname, 'src/assets'),
      },
  },
  }
};
