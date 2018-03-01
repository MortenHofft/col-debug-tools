var about = require('./about.md');
var _ = require('lodash');

module.exports = {
  template: require('./dataset.html'),
  controller: dataset
};

/** @ngInject */
function dataset($log, $stateParams, $state, Dataset) {
  var vm = this;
  vm.api = '//api.col.plus';
  vm.state = $stateParams;

  vm.limit = _.toSafeInteger($stateParams.limit) || 20;
  vm.offset = _.toSafeInteger($stateParams.offset) || 0;

  var q = _.assign({}, $stateParams, {limit: vm.limit, offset: vm.offset});
  vm.searchResults = Dataset.query(q);

  vm.search = function (keepOffset) {
    if (!keepOffset) {
      vm.offset = undefined;
    }
    var q = _.assign({}, $stateParams, {limit: vm.limit, offset: vm.offset});
    $state.go('.', q);
  };

  vm.tableConfig = {
    resource: Dataset,
    columns: [
      {
        path: 'key',
        title: 'Key',
        linkTemplate: '/dataset/{key}',
        templateKey: 'key'
      },
      {
        path: 'title',
        title: 'Title',
        linkTemplate: '/dataset/{key}',
        templateKey: 'key'
      },
      {
        path: 'version',
        title: 'Version'
      }
    ],
    paging: true
  };
}
