var about = require('./about.md');
var _ = require('lodash');

var ranks = ['KINGDOM', 'PHYLUM', 'SUBPHYLUM', 'CLASS', 'SUBCLASS', 'ORDER', 'SUBORDER', 'SUPERFAMILY', 'FAMILY', 'SUBFAMILY', 'TRIBE', 'SUBTRIBE', 'GENUS', 'SUBGENUS', 'SECTION', 'SPECIES', 'SUBSPECIES', 'VARIETY', 'SUBVARIETY', 'FORM', 'SUBFORM'];
module.exports = {
  template: require('./SpeciesSearch.html'),
  controller: SpeciesSearch
};

/** @ngInject */
function SpeciesSearch($log, $stateParams, $state, SpeciesSearch) {
  var vm = this;
  vm.state = $stateParams;
  vm.ranks = ranks;

  vm.searchResults = SpeciesSearch.query($stateParams);

  vm.search = function () {
    $state.go('speciesSearch', $stateParams);
  };
}
