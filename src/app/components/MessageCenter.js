module.exports = {
  template: require('./MessageCenter.html'),
  controller: MessageCenter,
  bindings: {}
};

/** @ngInject */
function MessageCenter(Message) {
  var vm = this;
  vm.Message = Message;
}
