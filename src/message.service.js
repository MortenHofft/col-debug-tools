'use strict';

var angular = require('angular');
var _ = require('lodash');

angular
.module('app')
.service('Message', function ($rootScope, $state, $localStorage) {
  var maxLimit = 100;
  var minimumErrorCode = 400;
  $localStorage.messages = $localStorage.messages || [];

  function addMessage(err, message) {
    var messages = $localStorage.messages;
    if (!err.status || !err.config || !err.config.url) {
      console.error('invalid error message pushed to message center');
    } else if (err.status < minimumErrorCode) {
      // ignore as error code isn't over the states one.
      console.log('Error recieved, but status code below threshold');
    } else {
      var params = err.config.paramSerializer(err.config.params || {});
      var url = params ? err.config.url + '?' + params : err.config.url;
      var item = {status: err.status, url: url, message: message};
      $localStorage.messages = _.slice(_.uniqBy(messages ? _.concat(item, messages) : [item], 'url'), 0, maxLimit);
    }
  }

  function clearAll() {
    $localStorage.messages = [];
  }

  function getMessages() {
    return $localStorage.messages;
  }

  return {
    add: addMessage,
    clearAll: clearAll,
    get: getMessages
  };
});
