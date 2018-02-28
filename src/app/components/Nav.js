module.exports = {
  template: require('./Nav.html'),
  controller: Nav,
  bindings: {
  }
};

/** @ngInject */
function Nav($state, $log, $mdSidenav) {
  this.$state = $state;
  this.$log = $log;
  this.$mdSidenav = $mdSidenav;
  this.menuOptions = [
    {name: 'Species search', state: 'speciesSearch'}
    // {name: 'Overingested datasets', state: 'overcrawls'},
    // {name: 'IPT sync state', state: 'iptSyncState'},
    // {name: 'Ingestion Monitor', state: 'currentCrawls'}
  ];
}

Nav.prototype = {
  changeState: function (state) {
    this.$state.go(state);
    this.$mdSidenav('left_nav')
      .close();
  }
};
