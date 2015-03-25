'use strict';

/* App Module */

var smApp = angular.module('smApp', [
  'ngRoute',
]);

smApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/browsing-list.html',
        // controller: 'PhoneListCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
