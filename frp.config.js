'use strict';
module.exports = function(production) {
    global.FRP_DEST = 'wp';
    return {
        server: {
          proxy: 'localhost'
        }
    }
};
