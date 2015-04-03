'use strict';

/* App Module */

var productBrowseApp = angular.module('productBrowseApp', [
  'ngRoute',
  'productBrowseController',
  'angular-bootstrap-select',
]);

var customerApp = angular.module('customerApp',[
  'ngRoute',
  'customerController'
]);

var inventoryApp = angular.module('inventoryApp', [
  'ngRoute',
  'inventoryController',
  'angular-bootstrap-select'
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
        templateUrl: 'partials/select-store.html',
         controller: 'storeSelectController'
      }).
      when('/browsing-list/:store', {
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
      when('/customer-detail/:customerId/:opt', {
        templateUrl: 'partials/customer-detail.html',
         controller: 'customerDetailController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);

inventoryApp.directive('modal', function () {
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

inventoryApp.config(['$routeProvider', 
  function($routeProvider){
    $routeProvider.
      when('/', {
        templateUrl: 'partials/select-store.html',
         controller: 'storeSelectController'
      }).
      when('/inventory-list/:store', {
        templateUrl: 'partials/inventory-list.html',
         controller: 'inventoryListController'
      }).
      when('/inventory-new', {
        templateUrl: 'partials/inventory-new.html',
        controller: 'inventoryNewController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);



//Bootstrap select
angular.module('angular-bootstrap-select', [])
  .directive('selectpicker', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.selectpicker($parse(attrs.selectpicker)());
        element.addClass(attrs.class).selectpicker('setStyle')
        element.selectpicker('refresh');
        scope.$watch(attrs.ngModel, function (newVal, oldVal) {
          scope.$parent[attrs.ngModel] = newVal;
          scope.$evalAsync(function () {
            if (!attrs.ngOptions || /track by/.test(attrs.ngOptions)) element.val(newVal);
            element.selectpicker('refresh');
          });
        });
        
        scope.$on('$destroy', function () {
          scope.$evalAsync(function () {
            element.selectpicker('destroy');
          });
        });
      }
    };
  }]);
//})();
