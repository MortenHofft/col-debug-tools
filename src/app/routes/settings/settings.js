var _ = require('lodash');

module.exports = {
  template: require('./settings.html'),
  controller: settings
};

/** @ngInject */
function settings(Favorites, $localStorage) {
  var vm = this;
  vm.favorites = Favorites;

  vm.reset = function () {
    $localStorage.$reset();
    location.reload(true);
  };
}
