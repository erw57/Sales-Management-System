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

productBrowseControllers.controller('cartController', ['$scope', '$http',  function($scope, $http){
	$scope.cart = {};
	$scope.singleProductId = 0;
	$scope.total = 0;
	$scope.buy = function($event){
		var el = $event.target;
		var qty = parseInt(el.getAttribute('item-qty')); 
		var id = el.getAttribute('item-id');
		if($scope.cart[id]){
            $scope.cart[id].num += qty;
            $scope.total += qty * $scope.cart[id].price;                   
         }else{
            var arr = [];
            arr.name = el.getAttribute('item-name');
            arr.price = el.getAttribute('item-price');
            arr.num = qty;   
            arr.id = el.getAttribute('item-id');              
            $scope.cart[id] = arr;
            $scope.total += arr.num * arr.price;
        }
	}
	$scope.minus = function(id){
		var num = --$scope.cart[id].num;
		$scope.total -= $scope.cart[id].price;
		if(num == 0){
			delete $scope.cart[id];
		}
	}
	$scope.add = function(id){
		$scope.cart[id].num++;
		$scope.total += $scope.cart[id].price;
	}

	$scope.delete = function(id){
		$scope.total -= $scope.cart[id].price * $scope.cart[id].num;
		delete $scope.cart[id];
	}

	$scope.pay = false;
    $scope.placeOrder = function(){
        $scope.pay = !$scope.pay;
    };

    $scope.makePayment = function(){
    	$scope.pay = !$scope.pay;
    }
    
}]);



productBrowseControllers.controller('productListController',['$rootScope','$scope', '$http', 
	function($scope, $rootScope, $http){
		$http.get('api/getProductList?store_name=all').success(function(res){
			$scope.products = res.data;
		});
		//console.log($rootScope.cart);
		$scope.orderProp = 'name';
	}]);

productBrowseControllers.controller('productDetailController', ['$scope', '$routeParams', '$http', 
	function($scope, $routeParams, $http){
		$http.get('api/getProductDetail?id='+$routeParams.productId).success(function(data){
			$scope.product = data;
			$scope.singleProductId = $routeParams.productId;
			$scope.$emit("singleProduct", $scope.singleProductId);
		});

		$scope.increase = function(){
			$scope.qty++;
		}

		$scope.decrease = function(){
			if($scope.qty > 0){
				$scope.qty--;
			}		
		}

		$scope.store = false;
	    $scope.changeStore = function(){
	        $scope.store = !$scope.store;
	    };

	    $scope.selectStore = function(location){
	    	$scope.store = !$scope.store;
	    	$http.get('api/checkInventory?id='+$scope.singleProductId+'&&store=Center Store').success(function(res){
	    		console.log(res[0].amount);
	    		$scope.inventory = res[0].amount;
	    		$scope.storeName = res[0].store_name;
	    	});
	    }
}]);

customerControllers.controller('customerListController', ['$scope', '$http', function($scope, $http){
	$http.get('api/getCustomerList').success(function(res){
		$scope.customers = res.data;
		$scope.orderProp = 'name';
	});
}]);

customerControllers.controller('customerDetailController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
	$http.get('api/getCustomerInfo?id='+$routeParams.customerId).success(function(res){
		console.log(res);
		$scope.customer = res;
		$scope.opt = $routeParams.opt;
	});

	$scope.modifyCustomer = function(){
		console.log($scope.customer.kind);
		$http.post('api/modifyCustomer', $scope.customer).success(function(){
			console.log('customer updated');
		});
	}
}]);

inventoryController.controller('inventoryListController', ['$scope', '$http', function($scope, $http){
	
}]);
