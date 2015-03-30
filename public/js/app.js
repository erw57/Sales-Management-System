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

productBrowseApp.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });

productBrowseApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/browsing-list.html',
         controller: 'productListController'
      }).
      when('/browsing-detail/:productId', {
        templateUrl: 'partials/browsing-detail.html',
        controller: 'productDetailController'
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
         controller: 'customerListController'
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