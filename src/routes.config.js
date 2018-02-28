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
          url: '/name/search?q&datasetKey&rank&nomstatus&taxstatus&type&issue&offset&limit',
          component: 'speciesSearch'
        })
        .state('speciesTree', {
          url: '/species/tree?q&datasetKey',
          component: 'speciesTree'
        })
        .state('speciesKey', {
          url: '/taxon/:key?',
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
