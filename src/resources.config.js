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
          cancellable: true
        }
      });
    });
