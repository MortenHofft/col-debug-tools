var _ = require('lodash');
var async = require('async');

var rank = ['KINGDOM', 'PHYLUM', 'SUBPHYLUM', 'CLASS', 'SUBCLASS', 'ORDER', 'SUBORDER', 'SUPERFAMILY', 'FAMILY', 'SUBFAMILY', 'TRIBE', 'SUBTRIBE', 'GENUS', 'SUBGENUS', 'SECTION', 'SPECIES', 'SUBSPECIES', 'VARIETY', 'SUBVARIETY', 'FORM', 'SUBFORM'];
var nomstatus = ['LEGITIMATE', 'VARIANT', 'REPLACEMENT', 'CONSERVED', 'PROTECTED', 'UNAVAILABLE', 'NAKED', 'FORGOTTEN', 'ILLEGITIMATE', 'SUPERFLUOUS', 'REJECTED', 'DOUBTFUL', 'MANUSCRIPT', 'CHRESONYM', 'UNEVALUATED'];
var taxstatus = ['ACCEPTED', 'DOUBTFUL'];
var type = ['SCIENTIFIC', 'VIRUS', 'HYBRID-FORMULA', 'CULTIVAR', 'OTU', 'PLACEHOLDER', 'NONE'];

module.exports = {
  template: require('./nameSearch.html'),
  controller: nameSearch
};

/** @ngInject */
function nameSearch($log, $stateParams, $state, NameSearch, DatasetKey) {
  var vm = this;
  vm.api = '//api.col.plus';
  vm.state = $stateParams;
  vm.rank = rank;
  vm.nomstatus = nomstatus;
  vm.taxstatus = taxstatus;
  vm.type = type;
  vm.optionFilters = ['rank', 'nomstatus', 'taxstatus', 'type'];

  vm.limit = _.toSafeInteger($stateParams.limit) || 20;
  vm.offset = _.toSafeInteger($stateParams.offset) || 0;

  var q = _.assign({}, $stateParams, {limit: vm.limit, offset: vm.offset});
  vm.searchResults = NameSearch.query(q);

  vm.search = function (keepOffset) {
    if (!keepOffset) {
      vm.offset = undefined;
    }
    var q = _.assign({}, $stateParams, {limit: vm.limit, offset: vm.offset});
    $state.go('nameSearch', q);
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
