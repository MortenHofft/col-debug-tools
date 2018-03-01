var about = require('./about.md');
var _ = require('lodash');
var async = require('async');
var jsonMarkup = require('json-markup');

module.exports = {
  template: require('./nameKey.html'),
  controller: nameKey
};

/** @ngInject */
function nameKey($log, $stateParams, $state, NameKey, NameKeyDetails, NameKeyDetailList) {
  var vm = this;
  vm.name = NameKey.get({key: $stateParams.key});
  vm.synonyms = NameKeyDetailList.get({key: $stateParams.key, detail: 'synonyms'});

  vm.name.$promise.then(function () {
    console.log('name key promise');
    var o = angular.fromJson(angular.toJson(vm.name));
    decorateInfoJson(o);
    vm.nameJson = jsonMarkup(o);
  });

  function decorateInfoJson(o) {
    decorate(o, 'datasetKey', '/dataset/KEY');
  }

  function decorate(o, path, template) {
    var v = _.get(o, path);
    if (v) {
      _.set(o, path, location.protocol + '//' + location.host + template.replace('KEY', v));
    }
  }
}
