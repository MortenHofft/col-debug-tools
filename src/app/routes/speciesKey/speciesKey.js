var about = require('./about.md');
var _ = require('lodash');
var async = require('async');

module.exports = {
  template: require('./speciesKey.html'),
  controller: speciesKey
};

/** @ngInject */
function speciesKey($log, $stateParams, $state, SpeciesKey) {
  var vm = this;
}
