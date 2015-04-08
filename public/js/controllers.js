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
		//$scope.products[id-1].quantity --;
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

    $scope.makePayment = function(customerId){
    	$scope.pay = true;
    	var data = {};
    	var payCart = [];
    	data.customer_id = customerId;
    	data.store_id = $scope.store.id;
    	for(var item in $scope.cart){
    		var o = {};
    		o.product_id = $scope.cart[item].id;
    		o.quantity = $scope.cart[item].num;
    		o.price = $scope.cart[item].price;
    		payCart.push(o);
    	}
    	data.cart = payCart;
    	//console.log(data);
    	$http.post('/api/makePayment',data).success(function(res){
    		$scope.pay = false;
    		alert(res.message);
    		$scope.cart = {};
    		$scope.total = 0;
    	});
    } 
}]);

productBrowseControllers.controller('storeSelectController',['$scope','$http',
	function($scope,$http){
		$scope.storeList = [];
		$scope.type ='product';
		$http.get('api/getStoreList').success(function(res){
			$scope.storeList = res.data;
			$scope.store = '';
		});
		$scope.goToList = function(){
			//console.log($rootScope.store.name);
			$scope.store == '' ? alert('Please select a store!') : window.location.href='#/browsing-list/'+$scope.store.id;
		}
}]);


productBrowseControllers.controller('productListController',['$scope','$routeParams','$http', 
	function($scope, $routeParams, $http){
		//$rootScope.store = $routeParams.store;
		$http.get('api/getProductList?store_id='+$routeParams.store).success(function(res){
			$scope.products = res.data;
		});

		$scope.orderProp = 'name';
		
}]);

productBrowseControllers.controller('productDetailController', ['$scope', '$routeParams', '$http', 
	function($scope, $routeParams, $http){
		$http.get('api/getProductDetail?id='+$routeParams.productId+'&&store='+$scope.store.id).success(function(data){
			$scope.product = data;
		});

		$scope.increase = function(){
			$scope.qty++;
		}

		$scope.decrease = function(){
			if($scope.qty > 0){
				$scope.qty--;
			}		
		}
}]);

customerControllers.controller('customerListController', ['$scope', '$http', function($scope, $http){
	$http.get('api/getCustomerList').success(function(res){
		$scope.customers = res.data;
		$scope.orderProp = 'name';
	});

	$scope.goToNew = function(){
		window.location.href="#/customer-new";
	}
}]);

customerControllers.controller('customerDetailController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
	$http.get('api/getCustomerInfo?id='+$routeParams.customerId).success(function(res){
		console.log(res);
		$scope.customer = res;
		$scope.opt = $routeParams.opt;
	});

	$scope.historyShow = false;
	$scope.showHistory = function(){
		$scope.historyShow = !$scope.historyShow;
	}

	$scope.modifyCustomer = function(){
		console.log($scope.customer.kind);
		$http.post('api/modifyCustomer', $scope.customer).success(function(data){
			alert(data.message);
			window.location.href='#/customer-detail/'+$routeParams.customerId+'/view';
		});
	}
}]);

customerControllers.controller('customerNewController', ['$scope','$http',function($scope,$http){
	$scope.customer = {};
	$scope.customer.kind = 'home';
	$scope.customer.category = 'Medicare'
	$scope.addCustomer = function(){
		console.log($scope.customer);
		$http.post('/api/addNewCustomer', $scope.customer).success(function(res){
			alert(res.message);
			if(res.message == 'success'){
				window.location.href='#/'
;			}
		});
	}
}]);

inventoryControllers.controller('storeSelectController',['$scope','$http',
	function($scope,$http){
		$scope.storeList = [];
		$scope.type = 'inventory';
		$http.get('api/getStoreList').success(function(res){
			$scope.storeList = res.data;
			$scope.store = '';
		});
		$scope.goToList = function(){
			//console.log($rootScope.store.name);
			$scope.store == '' ? alert('Please select a store!') : window.location.href='#/inventory-list/'+$scope.store.id;
		}
}]);

inventoryControllers.controller('inventoryListController',['$scope','$routeParams','$http', 
	function($scope, $routeParams, $http){
		$http.get('api/getProductList?store_id='+$routeParams.store).success(function(res){
			$scope.products = res.data;
		});
		$http.get('/api/getStoreList').success(function(res){
			$scope.storeList = res.data;
		});

		$scope.orderProp = 'name';

		$scope.stock = false;
		$scope.inStock = function($event){
			$scope.stock = !$scope.stock;
			$scope.inStockId = $event.target.getAttribute('product-id');
		}
		$scope.confirmInStock = function(qty){
			var data = {};
			data.store_id = $scope.store.id;
			data.product_id = $scope.inStockId;
			data.quantity = '+' + qty;
			$http.post('/api/updateInventory',data).success(function(res){
				$scope.stock = !$scope.stock;
				if(res.message == 'success'){
					$scope.products[data.product_id-1].quantity += parseInt(data.quantity);
				}
				alert(res.message);
			});
		}

		$scope.destock = false;
		$scope.outStock = function($event){
			$scope.destock = !$scope.destock;
			$scope.outStockId = $event.target.getAttribute('product-id');
		}
		$scope.confirmOutStock = function(outStockTo,outStockQty){
			var data = {};
			data.from = $scope.store.id;
			data.to = outStockTo;
			data.quantity = outStockQty;
			data.id = $scope.outStockId;
			console.log(data);
			$http.post('/api/stockTransport', data).success(function(res){
				console.log(res);
				//stock transport successfully!!!!!!!!
				$scope.destock = !$scope.destock;
				if(res.message == 'success'){
					$scope.products[data.id-1].quantity -= data.quantity;
				}
				alert(res.message);
			});
		}

		$scope.goToNew = function(){
			window.location.href='#/inventory-new';
		}
}]);

inventoryControllers.controller('inventoryNewController', ['$scope', 'FileUploader', function($scope, FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
	            url: '/api/addNewProduct',
	            formData: [],
	            //formData: {newProduct:$scope.newProduct},
	        });
        //FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // $scope.confirm = function(){
        // 	var uploader = $scope.uploader = new FileUploader({
	       //      url: 'upload.php',
	       //      formData: [],
	       //      //formData: {newProduct:$scope.newProduct},
	       //  });
        // 	uploader.uploadAll();
        // }
        // CALLBACKS

        // uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        //     console.info('onWhenAddingFileFailed', item, filter, options);
        // };
        // uploader.onAfterAddingFile = function(fileItem) {
        //     console.info('onAfterAddingFile', fileItem);
        // };
        // uploader.onAfterAddingAll = function(addedFileItems) {
        //     console.info('onAfterAddingAll', addedFileItems);
        // };
        uploader.onBeforeUploadItem = function(item) {
        	item.formData.push({newProduct: $scope.newProduct});
        };
        // uploader.onProgressItem = function(fileItem, progress) {
        //     console.info('onProgressItem', fileItem, progress);
        // };
        // uploader.onProgressAll = function(progress) {
        //     console.info('onProgressAll', progress);
        // };
        // uploader.onSuccessItem = function(fileItem, response, status, headers) {
        //     console.info('onSuccessItem', fileItem, response, status, headers);
        // };
        // uploader.onErrorItem = function(fileItem, response, status, headers) {
        //     console.info('onErrorItem', fileItem, response, status, headers);
        // };
        // uploader.onCancelItem = function(fileItem, response, status, headers) {
        //     console.info('onCancelItem', fileItem, response, status, headers);
        // };
        // uploader.onCompleteItem = function(fileItem, response, status, headers) {
        //     console.info('onCompleteItem', fileItem, response, status, headers);
        // };
        // uploader.onCompleteAll = function() {
        //     console.info('onCompleteAll');
        // };

        // console.info('uploader', uploader);
    }]);
