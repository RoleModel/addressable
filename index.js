var Addressable = require('./lib/addressable');

if (typeof angular !== 'undefined') {
  angular.module('addressable', []);
  angular.module('addressable').factory('Addressable', [function () {
    return Addressable;
  }]);
}

module.exports = Addressable;
