'use strict';

var angular = require('angular');
var _ = require('lodash');

angular
.module('app')
.service('Helper', function (env) {
  function gotoApi() {
    var apiLocation = env.colApi + location.pathname + location.search;
    // eslint-disable-next-line angular/window-service
    window.location = apiLocation;
  }

  return {
    gotoApi: gotoApi
  };
});
