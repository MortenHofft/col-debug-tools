module.exports = materialConfig;

/** @ngInject */
function materialConfig($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('deep-orange');
}
