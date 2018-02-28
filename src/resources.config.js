'use strict';

var angular = require('angular');

var API = 'http://api.col.plus/';
console.log('add resources');
/** @ngInject */
angular
    .module('app')
    .factory('SpeciesSearch', function ($resource) {
      return $resource(API + 'name/search', null, {
        query: {
          method: 'GET',
          isArray: false,
          cancellable: true,
          cache: true
        }
      });
    })
    .factory('SpeciesKey', function ($resource) {
      return $resource(API + 'taxon/:key', null, {
        query: {
          method: 'GET',
          isArray: false,
          cancellable: true,
          cache: true
        }
      });
    })
  .factory('SpeciesKeyDetails', function ($resource) {
    return $resource(API + 'taxon/:key/:detail', null, {
      query: {
        method: 'GET',
        isArray: false,
        cancellable: true,
        cache: true
      }
    });
  })
    .factory('DatasetKey', function ($resource) {
      return $resource(API + 'dataset/:key', null, {
        query: {
          method: 'GET',
          isArray: false,
          cancellable: true,
          cache: true
        }
      });
    });
