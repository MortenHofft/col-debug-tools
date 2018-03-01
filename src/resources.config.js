'use strict';

var angular = require('angular');

var API = 'http://api.col.plus/';
console.log('add resources');
/** @ngInject */
angular
  .module('app')
  .factory('NameSearch', function ($resource) {
    return $resource(API + 'name/search', null, {
      query: {
        method: 'GET',
        isArray: false,
        cancellable: true,
        cache: true
      }
    });
  })
  .factory('NameKey', function ($resource) {
    return $resource(API + 'name/:key', null, {
      query: {
        method: 'GET',
        isArray: false,
        cancellable: true,
        cache: true
      }
    });
  })
  .factory('NameKeyDetails', function ($resource) {
    return $resource(API + 'name/:key/:detail', null, {
      query: {
        method: 'GET',
        isArray: false,
        cancellable: true,
        cache: true
      }
    });
  })
  .factory('NameKeyDetailList', function ($resource) {
    return $resource(API + 'name/:key/:detail', null, {
      query: {
        method: 'GET',
        isArray: true,
        cancellable: true,
        cache: true
      },
      get: {
        method: 'GET',
        isArray: true
      }
    });
  })
  .factory('TaxonKey', function ($resource) {
    return $resource(API + 'taxon/:key', null, {
      query: {
        method: 'GET',
        isArray: false,
        cancellable: true,
        cache: true
      }
    });
  })
  .factory('TaxonKeyDetails', function ($resource) {
    return $resource(API + 'taxon/:key/:detail', null, {
      query: {
        method: 'GET',
        isArray: false,
        cancellable: true,
        cache: true
      }
    });
  })
  .factory('TaxonKeyDetailList', function ($resource) {
    return $resource(API + 'taxon/:key/:detail', null, {
      query: {
        method: 'GET',
        isArray: true,
        cancellable: true,
        cache: true
      },
      get: {
        method: 'GET',
        isArray: true
      }
    });
  })
    .factory('Dataset', function ($resource) {
      return $resource(API + 'dataset', null, {
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
