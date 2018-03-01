var angular = require('angular');

// js lisb
require('angular-ui-router');
require('angular-material');
require('angular-moment');
require('angular-sanitize');
require('angular-chart.js');
require('ngstorage');
require('angular-resource');

// css
require('angular-material/angular-material.css');
import './index.styl';

// routes
var App = require('./app/routes/App');
var nameSearch = require('./app/routes/nameSearch/nameSearch');
var nameKey = require('./app/routes/nameKey/nameKey');
var taxonKey = require('./app/routes/taxonKey/taxonKey');
// var IptSyncState = require('./app/routes/iptSyncState/iptSyncState');
// var Overcrawls = require('./app/routes/overcrawls/Overcrawls');
// var CurrentCrawls = require('./app/routes/currentCrawls/CurrentCrawls');

// components
var Header = require('./app/components/Header');
var Nav = require('./app/components/Nav');

// configurations
var routesConfig = require('./routes.config');
var materialConfig = require('./material.config');
var env = require('./env.constant');

angular
  .module('app', ['ui.router', 'ngMaterial', 'angularMoment', 'ngSanitize', 'chart.js', 'ngStorage', 'ngResource'])
  .config(routesConfig)
  .config(materialConfig)
  .constant('env', env)
  .component('app', App)
  .component('nameSearch', nameSearch)
  .component('nameKey', nameKey)
  .component('taxonKey', taxonKey)
  // .component('speciesTree', SpeciesTree)
  // .component('speciesKey', SpeciesKey)
  // .component('datasetSearch', DatasetSearch)
  // .component('datasetKey', DatasetKey)
  .component('headerComponent', Header)
  .component('navComponent', Nav);

// base config
require('./filters');
require('./resources.config');
