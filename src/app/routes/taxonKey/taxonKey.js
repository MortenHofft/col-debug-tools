var _ = require('lodash');
var jsonMarkup = require('json-markup');

module.exports = {
  template: require('./taxonKey.html'),
  controller: taxonKey
};

/** @ngInject */
function taxonKey($http, $log, $stateParams, $state, env, TaxonKey, TaxonKeyDetails, TaxonKeyDetailList, Taxon, Favorites, $localStorage, Message) {
  var vm = this;
  vm.favorites = Favorites;
  vm.localStorage = $localStorage;
  vm.key = $stateParams.itemKey;
  vm.childrenLimit = 100;
  vm.taxon = TaxonKey.get({key: $stateParams.itemKey});
  vm.info = TaxonKeyDetails.get({key: $stateParams.itemKey, detail: 'info'});
  vm.children = TaxonKeyDetails.query({key: $stateParams.itemKey, detail: 'children', limit: vm.childrenLimit});
  vm.classification = TaxonKeyDetailList.query({key: $stateParams.itemKey, detail: 'classification'});
  vm.synonyms2 = TaxonKeyDetailList.query({key: $stateParams.itemKey, detail: 'classification'});

  $http.get(env.colApi + '/taxon/' + $stateParams.itemKey + '/synonyms', {query: {key: $stateParams.itemKey, detail: 'synonyms'}})
    .then(function (response) {
      vm.synonyms = response.data;
    })
    .catch(function (err) {
      Message.add(err, 'Unble to get taxon synonyms');
    });

  vm.info.$promise.then(function () {
    var o = angular.fromJson(angular.toJson(vm.info));
    decorateInfoJson(o);
    vm.infoJson = jsonMarkup(o);
  });

  function decorateInfoJson(o) {
    decorate(o, 'taxon.datasetKey', '/dataset/KEY');
    decorate(o, 'taxon.name.datasetKey', '/dataset/KEY');
    decorate(o, 'taxon.parentKey', '/taxon/KEY');
    decorate(o, 'taxon.name.key', '/name/KEY');
  }

  function decorate(o, path, template) {
    var v = _.get(o, path);
    if (v) {
      _.set(o, path, location.protocol + '//' + location.host + template.replace('KEY', v));
    }
  }

  vm.toggleFavorite = function () {
    vm.taxon.$promise.then(function () {
      Favorites.toggle('taxon', vm.taxon.key, vm.taxon.name.scientificName);
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

  vm.classificationConfig = {
    columns: [
      {
        path: 'name.scientificName',
        title: 'Scientific Name'
      },
      {
        path: 'name.rank',
        title: 'Rank'
      }
    ]
  };
}
