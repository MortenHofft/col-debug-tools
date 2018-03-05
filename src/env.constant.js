var _ = require('lodash');

var environments = {
  prod: {
    colApi: '//api.col.plus',
    env: 'prod'
  },
  uat: {
    colApi: '//api.col.plus',
    env: 'uat'
  },
  dev: {
    colApi: '//api.col.plus',
    env: 'dev'
  }
};

/*eslint-disable */
var domain = window.location.hostname;
/*eslint-enable */

var env = environments.prod;
if (_.endsWith(domain, 'col-uat.plus')) {
  env = environments.uat;
} else if (_.endsWith(domain, 'col-dev.plus')) {
  env = environments.dev;
}

module.exports = env;
