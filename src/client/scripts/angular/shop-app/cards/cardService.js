/**
 *  Card Service that is responsible for making requests to the cards API.
 *
 *  @author danielmoffat
 */

var CONSTANTS = require('../_constants');

angular.module(CONSTANTS.APP_NAMESPACE)
  .service('CardService', ['$log', '$http', function($log, $http) {

    var endpoint = 'http://localhost:3333';

    var queries = {
        query: '/api/query',
        add: '/api/add',
        remove: '/api/remove',
        basket: '/api/basket'
    };

    var service = {
      getAll: getAll,
    };

    return service;

    function getAll() {
      return $http.get(getQueryFor('query')).then(function(response) {
        return response.data;
      });
    }

    function getQueryFor(name) {
      return endpoint + queries[name];
    }

  }]);
