var about = require('./about.md');
var _ = require('lodash');

module.exports = {
  template: require('./SpeciesSearch.html'),
  controller: SpeciesSearch
};

/** @ngInject */
function SpeciesSearch($log, $stateParams, $state, SpeciesSearch) {
  var vm = this;
  console.log('in controller SpeciesSearch');
  SpeciesSearch.query({datasetKey: 101, rank: 'SPECIES'});
}
