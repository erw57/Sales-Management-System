'use strict';

/* App Module */

var productBrowseApp = angular.module('productBrowseApp', [
  'ngRoute',
]);

productBrowseApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/browsing-list.html',
        // controller: 'PhoneListCtrl'
      }).
      when('/browsing-detail', {
        templateUrl: 'partials/browsing-detail.html',
        // controller: 'PhoneListCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
