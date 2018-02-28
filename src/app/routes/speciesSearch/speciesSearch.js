var about = require('./about.md');
var _ = require('lodash');
var async = require('async');

var rank = ['KINGDOM', 'PHYLUM', 'SUBPHYLUM', 'CLASS', 'SUBCLASS', 'ORDER', 'SUBORDER', 'SUPERFAMILY', 'FAMILY', 'SUBFAMILY', 'TRIBE', 'SUBTRIBE', 'GENUS', 'SUBGENUS', 'SECTION', 'SPECIES', 'SUBSPECIES', 'VARIETY', 'SUBVARIETY', 'FORM', 'SUBFORM'];
var nomstatus = ['LEGITIMATE', 'VARIANT', 'REPLACEMENT', 'CONSERVED', 'PROTECTED', 'UNAVAILABLE', 'NAKED', 'FORGOTTEN', 'ILLEGITIMATE', 'SUPERFLUOUS', 'REJECTED', 'DOUBTFUL', 'MANUSCRIPT', 'CHRESONYM', 'UNEVALUATED'];
var taxstatus = ['ACCEPTED', 'DOUBTFUL'];
var type = ['SCIENTIFIC', 'VIRUS', 'HYBRID-FORMULA', 'CULTIVAR', 'OTU', 'PLACEHOLDER', 'NONE'];

module.exports = {
  template: require('./speciesSearch.html'),
  controller: SpeciesSearch
};

/** @ngInject */
function SpeciesSearch($log, $stateParams, $state, SpeciesSearch, DatasetKey) {
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
  vm.searchResults = SpeciesSearch.query(q);
  vm.searchResults.$promise.then(decorate);

  vm.search = function (keepOffset) {
    if (!keepOffset) {
      vm.offset = undefined;
    }
    var q = _.assign({}, $stateParams, {limit: vm.limit, offset: vm.offset});
    $state.go('speciesSearch', q);
  };

  function decorate(response) {
    async.eachLimit(response.result, 10, decorateWithDatasetTitle, function () {
          // ignore errors
    });
  }

  function decorateWithDatasetTitle(nameUsage, cb) {
    // get dataset title if not already there
    DatasetKey.get({key: nameUsage.datasetKey}).$promise
      .then(function (response) {
        nameUsage._datasetTitle = response.title;
        cb();
      })
      .catch(function () {
          // ignore errors
        cb();
      });
  }
}

/*
var list = 'ok, unavailable, illegitimate, variant, conserved, rejected, doubtful, unevaluated';
var a = list.toUpperCase();
var b = a.split(',');
b = b.map(function (e) {
  return e.trim();
});
*/
