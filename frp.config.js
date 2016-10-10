'use strict';
module.exports = function(production) {
    return {
        server: {
          server: false,
          proxy: 'localhost'
        }
    }
};
