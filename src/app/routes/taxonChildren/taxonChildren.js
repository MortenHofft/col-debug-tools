var _ = require('lodash');
var async = require('async');

module.exports = {
  template: require('./taxonChildren.html'),
  controller: taxonChildren
};

/** @ngInject */
function taxonChildren($log, $stateParams, $state, TaxonKeyDetails, DatasetKey) {
  var vm = this;
  vm.api = '//api.col.plus';
  vm.state = $stateParams;

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

  vm.tableConfig = {
    resource: TaxonKeyDetails,
    resourceDefaults: {
      key: $stateParams.itemKey,
      detail: 'children'
    },
    columns: [
      {
        path: 'name.scientificName',
        title: 'Scientific Name'
      },
      {
        path: 'name.rank',
        title: 'RAnk'
      },
      {
        path: '_datasetTitle',
        title: 'Dataset',
        linkTemplate: '/dataset/{key}',
        templateKey: 'datasetKey'
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
