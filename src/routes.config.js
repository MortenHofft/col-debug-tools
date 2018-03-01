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
    .state('nameSearch', {
      url: '/name/search?q&datasetKey&rank&nomstatus&taxstatus&type&issue&offset&limit',
      component: 'nameSearch'
    })
    .state('nameKey', {
      url: '/name/:key?',
      component: 'nameKey'
    })
    .state('speciesTree', {
      url: '/species/tree?q&datasetKey',
      component: 'speciesTree'
    })
    .state('taxonKey', {
      url: '/taxon/:key?',
      component: 'taxonKey'
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
