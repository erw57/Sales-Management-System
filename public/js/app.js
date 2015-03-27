'use strict';

/* App Module */

var productBrowseApp = angular.module('productBrowseApp', [
  'ngRoute',
  'productBrowseController',
]);

var customerApp = angular.module('customerApp',[
  'ngRoute',
  'customerController'
  ]);

productBrowseApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/browsing-list.html',
         controller: 'productListController'
      }).
      when('/browsing-detail', {
        templateUrl: 'partials/browsing-detail.html',
        // controller: 'PhoneListCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

customerApp.config(['$routeProvider', 
  function($routeProvider){
    $routeProvider.
      when('/', {
        templateUrl: 'partials/customer-list.html',
        // controller: 'customerListController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
  ]);