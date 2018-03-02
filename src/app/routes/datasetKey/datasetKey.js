var about = require('./about.md');
var _ = require('lodash');
var async = require('async');
var jsonMarkup = require('json-markup');

module.exports = {
  template: require('./datasetKey.html'),
  controller: datasetKey
};

/** @ngInject */
function datasetKey($log, $stateParams, $state, DatasetKey, Favorites, $localStorage) {
  var vm = this;
  vm.localStorage = $localStorage;
  vm.favorites = Favorites;
  vm.dataset = DatasetKey.get({key: $stateParams.itemKey});

  vm.dataset.$promise.then(function () {
    var o = angular.fromJson(angular.toJson(vm.dataset));
    decorateInfoJson(o);
    vm.datasetJson = jsonMarkup(o);
  });

  function decorateInfoJson(o) {
    // decorate(o, 'datasetKey', '/dataset/KEY');
  }

  vm.toggleFavorite = function () {
    vm.dataset.$promise.then(function () {
      Favorites.toggle('dataset', vm.dataset.key, vm.dataset.title);
    });
  };

  function decorate(o, path, template) {
    var v = _.get(o, path);
    if (v) {
      _.set(o, path, location.protocol + '//' + location.host + template.replace('KEY', v));
    }
  }
}
