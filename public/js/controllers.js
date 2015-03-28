'use strict';

/* Controllers */

// var phonecatControllers = angular.module('phonecatControllers', []);

// phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http',
//   function($scope, $http) {
//     $http.get('phones/phones.json').success(function(data) {
//       $scope.phones = data;
//     });

//     $scope.orderProp = 'age';
//   }]);

// phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', '$http',
//   function($scope, $routeParams, $http) {
//     $http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
//       $scope.phone = data;
//     });
//   }]);

var productBrowseControllers = angular.module('productBrowseController',[]);
var customerControllers = angular.module('customerController', []);
var inventoryController = angular.module('inventoryController', []);

productBrowseControllers.controller('productListController',['$rootScope','$scope', '$http', 
	function($scope, $rootScope, $http){
		$http.get('api/getProductList?store_name=all').success(function(res){
			$scope.products = res.data;
		});
	}]);

productBrowseControllers.controller('cartController', ['$scope', function($scope){

}]);

customerControllers.controller('customerListController', ['$scope', '$http', function($scope, $http){
	
}]);

inventoryController.controller('inventoryListController', ['$scope', '$http', function($scope, $http){
	
}]);
