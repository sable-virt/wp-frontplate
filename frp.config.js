'use strict';
module.exports = function(production) {
    return {
        server: {
          proxy: 'localhost'
        }
    }
};
