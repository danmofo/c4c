/**
 *  Extremely basic Angular app
 */
var angular = require('angular');
var CONSTANTS = require('./_constants');

angular
  .module(CONSTANTS.APP_NAMESPACE, [])
  .service('ApiQueryBuilder', function() {
    return {
      _query: '',
      newQuery: function() {
        this._query = CONSTANTS.API_URL;
        return this;
      },
      path: function(path) {
        if(path) {
          this._query += path;
        }
        return this;
      },
      get: function() {
        return this._query;
      }
    };
  })
  .service('CardService', ['$http', 'ApiQueryBuilder', function($http, ApiQueryBuilder) {
    var getAllQuery = ApiQueryBuilder.newQuery().path('/api/list').get();

    return {
      getAll: function() {
        return $http.get(getAllQuery).then(function(response) {
          return response.data;
        });
      }
    };
  }])
  .component('card', {
    bindings: {
      model: '<'
    },
    controller: function() {},
    template: '<div class="card"><img ng-src="{{ $ctrl.model.imageUrl }}" width="100" /><p>{{ $ctrl.model.name }}</p></div>'
  })
  .component('cards', {
	  controller: ['CardService', function(CardService) {
      var ctrl = this;
      ctrl.filters =  {};

      CardService.getAll().then(function(response) {
        ctrl.cards = response;
      });

	  }],
	  templateUrl: '/scripts/angular/shop-app/views/home.html'
	})
  .component('filter', {
    bindings: {
      fkey: '@',
      key: '<',
      label: '@'
    },
    controller: function() {},
    template: '<div class="filter"><pre>{{ $ctrl | json }}</pre><input type="text" ng-model="$ctrl.key[$ctrl.fkey]" /> {{ $ctrl.label }}</div>'
  });
