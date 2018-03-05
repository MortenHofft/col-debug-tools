var _ = require('lodash');
var jsonMarkup = require('json-markup');

module.exports = {
  template: require('./datasetKey.html'),
  controller: datasetKey
};

/** @ngInject */
function datasetKey($log, $stateParams, $state, DatasetKey, DatasetKeyImport, Favorites, $localStorage) {
  var vm = this;
  vm.localStorage = $localStorage;
  vm.favorites = Favorites;
  vm.dataset = DatasetKey.get({key: $stateParams.itemKey});
  vm.datasetImport = DatasetKeyImport.query({key: $stateParams.itemKey});
  vm.chartMax = {};
  vm.chartFields = ['issuesCount', 'namesByRankCount', 'namesByTypeCount', 'distributionsByGazetteerCount', 'namesByOriginCount'];

  vm.dataset.$promise.then(function () {
    var o = angular.fromJson(angular.toJson(vm.dataset));
    decorateInfoJson(o);
    vm.datasetJson = jsonMarkup(o);
  });

  vm.datasetImport.$promise.then(function () {
    var o = angular.fromJson(angular.toJson(vm.datasetImport));
    decorateInfoJson(o);
    vm.datasetImportJson = jsonMarkup(o);
    if (vm.datasetImport[0]) {
      vm.chartFields.forEach(function (e) {
        var counts = vm.datasetImport[0][e];
        var max = _.max(_.valuesIn(counts));
        vm.chartMax[e] = max;
      });
    }
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

  vm.getWidth = function (count, key) {
    var max = vm.chartMax[key];
    return 100 * count / max;
  };
}
