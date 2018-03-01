'use strict';

var _ = require('lodash');

module.exports = {
  template: require('./Table.html'),
  controller: Table,
  bindings: {
    options: '<',
    results: '<'
  }
};

/** @ngInject */
function Table($scope, $state, $stateParams) {
  var vm = this;
  vm.api = '//api.col.plus';
  vm.state = $stateParams;

  vm.test = function () {
    return 'test';
  };

  vm.getPath = function (item, col) {
    return _.get(item, col.path);
  };

  vm.resolvePath = function (item, path) {
    return _.get(item, path);
  };

  vm.getUrl = function (item, col) {
    var template = col.linkTemplate;
    var templateValue = _.get(item, col.templateKey);
    return template.replace('{key}', templateValue);
  };
}
