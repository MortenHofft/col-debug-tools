'use strict';

var _ = require('lodash');
var async = require('async');

module.exports = {
  template: require('./TableSearch.html'),
  controller: TableSearch,
  bindings: {
    options: '<'
  }
};

/** @ngInject */
function TableSearch($scope, $state, $stateParams) {
  var vm = this;
  vm.api = '//api.col.plus';
  vm.state = $stateParams;

  vm.limit = _.toSafeInteger($stateParams.limit) || 20;
  vm.offset = _.toSafeInteger($stateParams.offset) || 0;

  function getData() {
    if (vm.options) {
      var q = _.assign({}, $stateParams, _.get(vm.options, 'resourceDefaults', {}), {limit: vm.limit, offset: vm.offset});
      delete q.itemKey;
      vm.searchResults = vm.options.resource.query(q);
      // eslint-disable-next-line angular/typecheck-function
      if (typeof vm.options.decorator === 'function') {
        vm.searchResults.$promise.then(function () {
          decorate(vm.searchResults);
        });
      }
    }
  }
  getData();

  function decorate(response) {
    async.eachLimit(response.result, 10, vm.options.decorator, function () {
      // ignore errors
    });
  }

  vm.search = function (keepOffset) {
    if (!keepOffset) {
      vm.offset = undefined;
    }
    var q = _.assign({}, $stateParams, _.get(vm.options, 'resourceDefaults', {}), {limit: vm.limit, offset: vm.offset});
    delete q.itemKey;
    $state.go('.', q, {reload: true, notify: true});
  };

  $scope.$watchCollection(function () {
    return vm.options;
  }, function () {
    getData();
  });
}
