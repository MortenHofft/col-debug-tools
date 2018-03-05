var _ = require('lodash');

module.exports = {
  template: require('./nameSearch.html'),
  controller: nameSearch
};

/** @ngInject */
function nameSearch($q, $log, $stateParams, $state, NameSearch, DatasetKey, Dataset, VocabType, Helper) {
  var vm = this;
  vm.api = '//api.col.plus';
  vm.state = $stateParams;
  vm.helper = Helper;

  vm.rank = VocabType.query({type: 'rank'});
  vm.nomstatus = VocabType.query({type: 'nomstatus'});
  vm.taxstatus = VocabType.query({type: 'taxstatus'});
  vm.type = VocabType.query({type: 'type'});
  vm.issue = VocabType.query({type: 'issue'});

  vm.optionFilters = ['rank', 'nomstatus', 'taxstatus', 'type', 'issue'];

  vm.limit = _.toSafeInteger($stateParams.limit) || 20;
  vm.offset = _.toSafeInteger($stateParams.offset) || 0;

  if ($stateParams.datasetKey) {
    DatasetKey.get({key: $stateParams.datasetKey}).$promise
    .then(function (e) {
      vm.selectedDatasetItem = e;
      vm.searchText = e.title;
    })
    .catch(function (e) {
    });
  }

  function getQueryParams() {
    var datasetKey = _.get(vm.selectedDatasetItem, 'key', undefined);
    var paging = {limit: vm.limit, offset: vm.offset};
    if (datasetKey) {
      paging.datasetKey = datasetKey;
    }
    var q = _.assign({}, $stateParams, paging);
    return q;
  }

  vm.searchResults = NameSearch.query(getQueryParams());

  vm.search = function (keepOffset) {
    if (!keepOffset) {
      vm.offset = undefined;
    }
    var q = getQueryParams();
    $state.go('nameSearch', q);
  };

  vm.clear = function () {
    $state.go('nameSearch', {}, {inherit: false});
  };

  function customDecoration(item, callback) {
    // get dataset title if not already there
    DatasetKey.get({key: item.datasetKey}).$promise
      .then(function (response) {
        item._datasetTitle = response.title;
        callback();
      })
      .catch(function () {
          // ignore errors
        callback();
      });
  }

  vm.querySearch = function (query) {
    var deferred = $q.defer();
    Dataset.query({q: query}).$promise
    .then(function (e) {
      console.log(e);
      deferred.resolve(e.result || []);
    })
    .catch(function (err) {
      deferred.reject(err);
    });
    return deferred.promise;
  };

  vm.tableConfig = {
    resource: NameSearch,
    columns: [
      {
        path: 'scientificName',
        title: 'Scientific Name'
      },
      {
        path: 'key',
        title: 'Name key',
        linkTemplate: '/name/{key}',
        templateKey: 'key'
      },
      {
        path: '_datasetTitle',
        title: 'Dataset',
        linkTemplate: '/dataset/{key}',
        templateKey: 'datasetKey'
      },
      {
        path: 'taxa',
        title: 'Taxa',
        type: 'ARRAY',
        displayPath: 'key',
        linkTemplate: '/taxon/{key}',
        templateKey: 'key'
      }
    ],
    decorator: customDecoration,
    paging: true
  };
}

/*
var list = 'ok, unavailable, illegitimate, variant, conserved, rejected, doubtful, unevaluated';
var a = list.toUpperCase();
var b = a.split(',');
b = b.map(function (e) {
  return e.trim();
});
*/
