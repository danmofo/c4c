/**
 *  Card Service that is responsible for making requests to the cards API.
 *
 *  @author danielmoffat
 */

var CONSTANTS = require('../_constants');

angular.module(CONSTANTS.APP_NAMESPACE)
  .component('card', {
    bindings: {
      model: '<'
    },
    controller: function() {},
    templateUrl: '/scripts/angular/shop-app/views/card.html'
  });


