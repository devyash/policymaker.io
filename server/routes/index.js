/*jslint node: true, indent: 2 */
'use strict';

var fs = require('fs');

module.exports = function (server) {
  fs.readdirSync('./routes').forEach(function (file) {
    if (file.substr(-3, 3) === '.js' && file !== 'index.js') {
      require('./' + file.replace('.js', ''))(server);
    }
  });
};
