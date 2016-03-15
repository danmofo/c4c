/**
 *  Card Service that is responsible for making requests to the cards API.
 *
 *  @author danielmoffat
 */

var CONSTANTS = require('../_constants');

angular.module(CONSTANTS.APP_NAMESPACE)
  .component('basket', {
    controller: ['BasketService', function(BasketService) {
      var ctrl = this;

      ctrl.items = [];

      BasketService.get().then(function(resp) {
        ctrl.items = resp;
      });

      return ctrl;
    }],
    templateUrl: '/scripts/angular/shop-app/views/basket.html'
  });


