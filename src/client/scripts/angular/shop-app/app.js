/**
 *  Extremely basic Angular app
 */
var angular = require('angular');
var CONSTANTS = require('./_constants');

angular.module(CONSTANTS.APP_NAMESPACE, []);

// todo: look at a better way of including things
require('./cards/cardService');
require('./cards/cards');
require('./cards/card');
require('./basket/basket');
