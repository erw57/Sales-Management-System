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

var inventoryApp = angular.module('inventoryApp', [
  'ngRoute',
  'inventoryController'
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
      when('/customer-detail', {
        templateUrl: 'partials/customer-detail.html',
        // controller: ''
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);

inventoryApp.config(['$routeProvider', 
  function($routeProvider){
    $routeProvider.
      when('/', {
        templateUrl: 'partials/inventory-list.html',
        //controller:
      }).
      when('/inventory-detail',{
        templateUrl: 'partials/inventory-detail.html',
        //controller:
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);