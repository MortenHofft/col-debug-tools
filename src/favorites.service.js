'use strict';

var angular = require('angular');
var _ = require('lodash');

angular
.module('app')
.service('Favorites', function ($rootScope, $state, $localStorage) {
  var maxLimitForType = 5;
  $localStorage.favorites = $localStorage.favorites || {};

  function addFavorite(type, key, title) {
    var k = String(key);
    var favorites = $localStorage.favorites[type];
    var item = {key: k, title: title, type: type};
    $localStorage.favorites[type] = _.slice(_.uniqBy(favorites ? _.concat(item, favorites) : [item], 'key'), 0, maxLimitForType);
  }

  function removeFavorite(type, key) {
    var k = String(key);
    var favorites = $localStorage.favorites[type] || [];
    _.remove(favorites, {key: k});
    return $localStorage.favorites[type];
  }

  function toggleFavorite(type, key, title) {
    var isAdded = isFavorite(type, key);
    if (isAdded) {
      removeFavorite(type, key);
    } else {
      addFavorite(type, key, title);
    }
  }

  function isFavorite(type, key) {
    var k = String(key);
    var favorites = $localStorage.favorites[type] || [];
    return _.findIndex(favorites, {key: k}) > -1;
  }

  function getFavorites(type, limit) {
    limit = limit || 5;
    var results = $localStorage.favorites[type] || [];
    return _.slice(results, 0, limit);
  }

  return {
    add: addFavorite,
    remove: removeFavorite,
    toggle: toggleFavorite,
    get: getFavorites,
    isFavorite: isFavorite
  };
});
