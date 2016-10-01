'use strict';
module.exports = {
  "proxy": 'localhost',
  "port": 3000,
  "middleware": [
  ],
  "ghostMode": {
    "clicks": true,
    "scroll": true,
    "forms": {
      "submit": true,
      "inputs": true,
      "toggles": true
    }
  }
};
