'use strict';

var angular = require('angular');

var API = 'http://api.col.plus/';

function errorHandler(Message) {
  return function (err) {
    Message.add(err);
  };
}

/** @ngInject */
angular
  .module('app')
  .factory('NameSearch', function ($resource, Message) {
    return $resource(API + 'name/search', null, {
      query: {
        method: 'GET',
        isArray: false,
        cancellable: true,
        cache: true,
        interceptor: {responseError: errorHandler(Message)}
      }
    });
  })
  .factory('NameKey', function ($resource, Message) {
    return $resource(API + 'name/:key', null, {
      query: {
        method: 'GET',
        isArray: false,
        cancellable: true,
        cache: true,
        interceptor: {responseError: errorHandler(Message)}
      },
      get: {
        interceptor: {responseError: errorHandler(Message)}
      }
    });
  })
  .factory('NameKeyDetails', function ($resource, Message) {
    return $resource(API + 'name/:key/:detail', null, {
      query: {
        method: 'GET',
        isArray: false,
        cancellable: true,
        cache: true,
        interceptor: {responseError: errorHandler(Message)}
      },
      get: {
        interceptor: {responseError: errorHandler(Message)}
      }
    });
  })
  .factory('NameKeyDetailList', function ($resource, Message) {
    return $resource(API + 'name/:key/:detail', null, {
      query: {
        method: 'GET',
        isArray: true,
        cancellable: true,
        cache: true,
        interceptor: {responseError: errorHandler(Message)}
      },
      get: {
        method: 'GET',
        isArray: true,
        interceptor: {responseError: errorHandler(Message)}
      }
    });
  })
  .factory('TaxonKey', function ($resource, Message) {
    return $resource(API + 'taxon/:key', null, {
      query: {
        method: 'GET',
        isArray: false,
        cancellable: true,
        cache: true,
        interceptor: {responseError: errorHandler(Message)}
      }
    });
  })
  .factory('TaxonKeyDetails', function ($resource, Message) {
    return $resource(API + 'taxon/:key/:detail', null, {
      query: {
        method: 'GET',
        isArray: false,
        cancellable: true,
        cache: true,
        interceptor: {responseError: errorHandler(Message)}
      }
    });
  })
  .factory('TaxonKeyDetailList', function ($resource, Message) {
    return $resource(API + 'taxon/:key/:detail', null, {
      query: {
        method: 'GET',
        isArray: true,
        cancellable: true,
        cache: true,
        interceptor: {responseError: errorHandler(Message)}
      },
      get: {
        method: 'GET',
        isArray: true,
        interceptor: {responseError: errorHandler(Message)}
      }
    });
  })
    .factory('Dataset', function ($resource, Message) {
      return $resource(API + 'dataset', null, {
        query: {
          method: 'GET',
          isArray: false,
          cancellable: true,
          cache: true,
          interceptor: {responseError: errorHandler(Message)}
        }
      });
    })
  .factory('DatasetKey', function ($resource, Message) {
    return $resource(API + 'dataset/:key', null, {
      query: {
        method: 'GET',
        isArray: false,
        cancellable: true,
        cache: true,
        interceptor: {responseError: errorHandler(Message)}
      },
      get: {
        interceptor: {responseError: errorHandler(Message)}
      }
    });
  });
