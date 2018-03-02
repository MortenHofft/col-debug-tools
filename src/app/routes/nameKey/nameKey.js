var about = require('./about.md');
var _ = require('lodash');
var async = require('async');
var jsonMarkup = require('json-markup');

module.exports = {
  template: require('./nameKey.html'),
  controller: nameKey
};

/** @ngInject */
function nameKey($log, $stateParams, $state, NameKey, NameKeyDetails, NameKeyDetailList, Favorites, $localStorage, Message) {
  var vm = this;
  vm.favorites = Favorites;
  vm.localStorage = $localStorage;
  vm.name = NameKey.get({key: $stateParams.itemKey});
  vm.synonyms = NameKeyDetailList.get({key: $stateParams.itemKey, detail: 'synonyms'});

  vm.name.$promise
    .then(function () {
      var o = angular.fromJson(angular.toJson(vm.name));
      decorateInfoJson(o);
      vm.nameJson = jsonMarkup(o);
    })
  .catch(function (err) {
    console.log(err);
  });

  function decorateInfoJson(o) {
    decorate(o, 'datasetKey', '/dataset/KEY');
  }

  vm.getCurrentPath = function () {
    return location.pathname + location.search;
  };

  function decorate(o, path, template) {
    var v = _.get(o, path);
    if (v) {
      _.set(o, path, location.protocol + '//' + location.host + template.replace('KEY', v));
    }
  }

  vm.toggleFavorite = function () {
    vm.name.$promise.then(function () {
      Favorites.toggle('name', vm.name.key, vm.name.scientificName);
    });
  };

  vm.synonymsConfig = {
    columns: [
      {
        path: 'scientificName',
        title: 'Scientific Name'
      },
      {
        path: 'authorship',
        title: 'authorship'
      },
      {
        path: 'datasetKey',
        title: 'DatasetKey',
        linkTemplate: '/dataset/{key}',
        templateKey: 'datasetKey'
      },
      {
        path: 'code',
        title: 'code'
      }
    ]
  };
}
