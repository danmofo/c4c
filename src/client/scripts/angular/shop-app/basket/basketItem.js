/**
 *  Card Service that is responsible for making requests to the cards API.
 *
 *  @author danielmoffat
 */

var CONSTANTS = require('../_constants');

angular.module(CONSTANTS.APP_NAMESPACE)
  .component('basketItem', {
    bindings: {
      model: '<'
    },
    controller: ['$log', function($log) {
      var ctrl = this;


      return ctrl;
    }],
    templateUrl: '/scripts/angular/shop-app/views/basket-item.html'
  });
