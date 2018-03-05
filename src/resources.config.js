'use strict';

var angular = require('angular');

function errorHandler(Message) {
  return function (err) {
    Message.add(err);
  };
}

/** @ngInject */
angular
  .module('app')
  .factory('NameSearch', function ($resource, Message, env) {
    return $resource(env.colApi + '/name/search', null, {
      query: {
        method: 'GET',
        isArray: false,
        cancellable: true,
        cache: true,
        interceptor: {responseError: errorHandler(Message)}
      },
      get: {
        method: 'GET',
        interceptor: {responseError: errorHandler(Message)}
      }
    });
  })
  .factory('NameKey', function ($resource, Message, env) {
    return $resource(env.colApi + '/name/:key', null, {
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
  .factory('NameKeyDetails', function ($resource, Message, env) {
    return $resource(env.colApi + '/name/:key/:detail', null, {
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
  .factory('NameKeyDetailList', function ($resource, Message, env) {
    return $resource(env.colApi + '/name/:key/:detail', null, {
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
.factory('VocabType', function ($resource, Message, env) {
  return $resource(env.colApi + '/vocab/:type', null, {
    query: {
      method: 'GET',
      isArray: true,
      cancellable: true,
      cache: true,
      interceptor: {responseError: errorHandler(Message)}
    },
    get: {
      interceptor: {responseError: errorHandler(Message)}
    }
  });
})
  .factory('Taxon', function ($resource, Message, env) {
    return $resource(env.colApi + '/taxon/', null, {
      query: {
        method: 'GET',
        isArray: false,
        cancellable: true,
        cache: true,
        interceptor: {responseError: errorHandler(Message)}
      },
      get: {
        method: 'GET',
        interceptor: {responseError: errorHandler(Message)}
      }
    });
  })
  .factory('TaxonKey', function ($resource, Message, env) {
    return $resource(env.colApi + '/taxon/:key', null, {
      query: {
        method: 'GET',
        isArray: false,
        cancellable: true,
        cache: true,
        interceptor: {responseError: errorHandler(Message)}
      },
      get: {
        method: 'GET',
        interceptor: {responseError: errorHandler(Message)}
      }
    });
  })
  .factory('TaxonKeyDetails', function ($resource, Message, env) {
    return $resource(env.colApi + '/taxon/:key/:detail', null, {
      query: {
        method: 'GET',
        isArray: false,
        cancellable: true,
        cache: true,
        interceptor: {responseError: errorHandler(Message)}
      },
      get: {
        method: 'GET',
        interceptor: {responseError: errorHandler(Message)}
      }
    });
  })
  .factory('TaxonKeyDetailList', function ($resource, Message, env) {
    return $resource(env.colApi + '/taxon/:key/:detail', null, {
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
  .factory('Dataset', function ($resource, Message, env) {
    return $resource(env.colApi + '/dataset', null, {
      query: {
        method: 'GET',
        isArray: false,
        cancellable: true,
        cache: true,
        interceptor: {responseError: errorHandler(Message)}
      },
      get: {
        method: 'GET',
        interceptor: {responseError: errorHandler(Message)}
      }
    });
  })
  .factory('DatasetKey', function ($resource, Message, env) {
    return $resource(env.colApi + '/dataset/:key', null, {
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
  .factory('DatasetKeyImport', function ($resource, Message, env) {
    return $resource(env.colApi + '/dataset/:key/import', null, {
      query: {
        method: 'GET',
        isArray: true,
        cancellable: true,
        cache: true,
        interceptor: {responseError: errorHandler(Message)}
      },
      get: {
        interceptor: {responseError: errorHandler(Message)}
      }
    });
  })
;
