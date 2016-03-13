/**
 *  Card Service that is responsible for making requests to the cards API.
 *
 *  @author danielmoffat
 */

var CONSTANTS = require('../_constants');

angular.module(CONSTANTS.APP_NAMESPACE)
  .component('cards', {
    controller: ['CardService', CardsComponentController],
    templateUrl: '/scripts/angular/shop-app/views/home.html'
  });


function CardsComponentController(CardService) {
    var ctrl = this;

    ctrl.cards = [];

    CardService.getAll().then(function(cards) {
      ctrl.cards = cards;
    });
}
