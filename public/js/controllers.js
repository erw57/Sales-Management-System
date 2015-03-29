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

productBrowseControllers.controller('cartController', ['$scope', '$rootScope', function($scope, $rootScope){
	$scope.cart = {};
	$scope.buy = function($event){
		var el = $event.target;
		var qty = parseInt(el.getAttribute('item-qty')); 
		var id = el.getAttribute('item-id');
		if($scope.cart[id]){
            $scope.cart[id].num += qty;                     
         }else{
            var arr = [];
            arr.name = el.getAttribute('item-name');
            arr.price = el.getAttribute('item-price');
            arr.num = qty;   
            arr.id = el.getAttribute('item-id');              
            $scope.cart[id] = arr;
        }
	}
	$scope.minus = function(id){
		var num = --$scope.cart[id].num;
		if(num == 0){
			delete $scope.cart[id];
		}
	}
	$scope.add = function(){
		$scope.cart[id].num++;
	}
}]);

productBrowseControllers.controller('productListController',['$rootScope','$scope', '$http', 
	function($scope, $rootScope, $http){
		$http.get('api/getProductList?store_name=all').success(function(res){
			$scope.products = res.data;
			$scope.$emit("toCart", $scope.products);
		});
		//console.log($rootScope.cart);
	}]);

productBrowseControllers.controller('productDetailController', ['$scope', '$routeParams', '$http', 
	function($scope, $routeParams, $http){
		$http.get('api/getProductDetail?id='+$routeParams.productId).success(function(data){
			$scope.product = data;
			console.log($scope.product);
		});
}]);

customerControllers.controller('customerListController', ['$scope', '$http', function($scope, $http){
	
}]);

inventoryController.controller('inventoryListController', ['$scope', '$http', function($scope, $http){
	
}]);
