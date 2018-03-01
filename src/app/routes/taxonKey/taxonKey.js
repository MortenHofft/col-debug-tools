var about = require('./about.md');
var _ = require('lodash');
var async = require('async');
var jsonMarkup = require('json-markup');

module.exports = {
  template: require('./taxonKey.html'),
  controller: taxonKey
};

/** @ngInject */
function taxonKey($log, $stateParams, $state, TaxonKey, TaxonKeyDetails) {
  var vm = this;
  vm.taxon = TaxonKey.get({key: $stateParams.key});
  vm.info = TaxonKeyDetails.get({key: $stateParams.key, detail: 'info'});
  vm.children = TaxonKeyDetails.get({key: $stateParams.key, detail: 'children'});
  // vm.classification = SpeciesKeyDetails.get({key: $stateParams.key, detail: 'classification'}, {isArray: true});
  vm.synonyms = TaxonKeyDetails.get({key: $stateParams.key, detail: 'synonyms'});
  vm.verbatim = TaxonKeyDetails.get({key: $stateParams.key, detail: 'verbatim'});

  vm.info.$promise.then(function () {
    console.log(5);
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
}
