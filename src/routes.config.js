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
      url: '/name/:itemKey?offset&limit',
      component: 'nameKey'
    })
    .state('speciesTree', {
      url: '/species/tree?q&datasetKey',
      component: 'speciesTree'
    })
    .state('taxonKey', {
      url: '/taxon/:itemKey?',
      component: 'taxonKey'
    })
  .state('taxonChildren', {
    parent: 'taxonKey',
    url: '/children?offset&limit',
    component: 'taxonChildren'
  })
    .state('dataset', {
      url: '/dataset?q&offset&limit',
      component: 'dataset'
    })
    .state('datasetKey', {
      url: '/dataset/:itemKey',
      component: 'datasetKey'
    });
}
