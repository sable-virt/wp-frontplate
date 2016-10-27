'use strict';
// https://github.com/frontainer/frontplate-cli/wiki/6.%E8%A8%AD%E5%AE%9A
module.exports = function (production) {
  global.FRP_DEST = 'wp/static';
  return {
    clean: {},
    html: {},
    style: production ? {} : {},
    script: production ? {} : {},
    server: {
      proxy: 'localhost'
    },
    copy: {},
    sprite: [],
    test: {}
  }
};
