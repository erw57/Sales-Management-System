'use strict';

var productBrowseControllers = angular.module('productBrowseController',[]);
var customerControllers = angular.module('customerController', []);
var inventoryControllers = angular.module('inventoryController', []);

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
            var item = {};
            item.name = el.getAttribute('item-name');
            item.price = el.getAttribute('item-price');
            item.num = qty;   
            item.id = el.getAttribute('item-id');              
            $scope.cart[id] = item;
            $scope.total += item.num * item.price;
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
    	var data = {};
    	var payCart = [];
    	data.customer_id = '920130';
    	data.salesperson = 'Er';
    	data.location = 'Center Store';
    	for(var item in $scope.cart){
    		var o = {};
    		o.id = $scope.cart[item].id;
    		o.quantity = $scope.cart[item].num;
    		o.name = $scope.cart[item].name;
    		payCart.push(o);
    	}
    	data.cart = payCart;
    	console.log(data);

    } 
}]);

productBrowseControllers.controller('storeSelectController',['$scope','$http',
	function($scope,$http){
		$scope.storeList = [];
		$http.get('api/getStoreList').success(function(res){
			$scope.storeList = res.data;
			$scope.store = '';
		});
		$scope.goToList = function(){
			$scope.store == '' ? alert('Please select a store!') : window.location.href='#/browsing-list/'+$scope.store;
		}
}]);


productBrowseControllers.controller('productListController',['$rootScope','$scope','$routeParams','$http', 
	function($rootScope, $scope, $routeParams, $http){
		$rootScope.store = $routeParams.store;
		$http.get('api/getProductList?store_id='+$routeParams.store).success(function(res){
			$scope.products = res.data;
		});

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
		$http.post('api/modifyCustomer', $scope.customer).success(function(data){
			alert(data.message);
			window.location.href='#/customer-detail/'+$routeParams.customerId+'/view';
		});
	}
}]);

inventoryControllers.controller('storeSelectController',['$scope','$http',
	function($scope,$http){
		$scope.storeList = [];
		$http.get('api/getStoreList').success(function(res){
			$scope.storeList = res.data;
			$scope.store = '';
		});
		$scope.goToList = function(){
			$scope.store == '' ? alert('Please select a store!') : window.location.href='#/inventory-list/'+$scope.store;
		}
}]);

inventoryControllers.controller('inventoryListController',['$scope','$routeParams','$http', 
	function($scope, $routeParams, $http){
		$scope.store = $routeParams.store;
		$http.get('api/getProductList?store_id='+$routeParams.store).success(function(res){
			$scope.products = res.data;
		});

		$scope.orderProp = 'name';

		$scope.changeStore = function(){
			console.log($scope.store); //change Store ，make request !!!!!!!
		}

		$scope.stock = false;
		$scope.inStock = function(){
			$scope.stock = !$scope.stock;
		}

		$scope.destock = false;
		$scope.outStock = function(){
			$scope.destock = !$scope.destock;
		}

		$scope.goToNew = function(){
			window.location.href='#/inventory-new';
		}
}]);

inventoryControllers.controller('inventoryNewController',['$scope',function($scope){
	console.log('inventory new');
}])

