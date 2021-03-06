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
var taxonChildren = require('./app/routes/taxonChildren/taxonChildren');
var dataset = require('./app/routes/dataset/dataset');
var datasetKey = require('./app/routes/datasetKey/datasetKey');
var settings = require('./app/routes/settings/settings');

// components
var Header = require('./app/components/Header');
var Nav = require('./app/components/Nav');
var Table = require('./app/components/Table');
var TableSearch = require('./app/components/TableSearch');
var MessageCenter = require('./app/components/MessageCenter');

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
  .component('taxonChildren', taxonChildren)
  .component('dataset', dataset)
  .component('datasetKey', datasetKey)
  .component('settings', settings)
  .component('headerComponent', Header)
  .component('tableComponent', Table)
  .component('tableSearchComponent', TableSearch)
  .component('messageCenterComponent', MessageCenter)
  .component('navComponent', Nav);

// base config
require('./filters');
require('./resources.config');

// services
require('./favorites.service');
require('./message.service');
require('./helper.service');
