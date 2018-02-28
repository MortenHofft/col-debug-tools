module.exports = routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
        .state('app', {
          url: '/',
          component: 'app'
        })
        .state('speciesSearch', {
          url: '/species/search?q&datasetKey',
          component: 'speciesSearch'
        })
        .state('speciesTree', {
          url: '/species/tree?q&datasetKey',
          component: 'speciesTree'
        })
        .state('speciesKey', {
          url: '/species/:key?',
          component: 'speciesKey'
        })
        .state('datasetSearch', {
          url: '/dataset/search',
          component: 'datasetSearch'
        })
        .state('datasetKey', {
          url: '/dataset/:key',
          component: 'datasetKey'
        });
}
