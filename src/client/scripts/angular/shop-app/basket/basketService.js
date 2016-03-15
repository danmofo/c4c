/**
 *  Card Service that is responsible for making requests to the cards API.
 *
 *  @author danielmoffat
 */

var CONSTANTS = require('../_constants');

angular.module(CONSTANTS.APP_NAMESPACE)
  .service('BasketService', ['$log', '$http', function($log, $http) {

    var queries = {
        basket: '/api/basket'
    };

    var service = {
      get: get
    };

    return service;

    function get() {
      return $http.get(getQueryFor('basket')).then(function(response) {
        return response.data.orderLines;
      });
    }

    function getQueryFor(name) {
      return CONSTANTS.API_BASE_URL + queries[name];
    }

  }]);
