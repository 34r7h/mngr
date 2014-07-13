angular.module('mngr.utility').directive('purchaseOrder', function(data) {
	return {
		restrict: 'EA',
		replace: true,
		controller: function($scope){

			$scope.purchaseOrder = function(){
				$scope.generatedOrder = [];
				$scope.supplierList = [];
				$scope.supplierResults = {};
				$scope.lastFinalValue = {};
				var supplierResults = [];
				angular.forEach(data.products.array, function(product){
					if(product.stock < product.lowStock){
						product.stockAlert = product.minOrder;
						data[$scope.type].fire.$child(product.$id).$update(product);
						if(product.suppliers){
							$scope.generatedOrder.push({name:product.name,id:product.$id,upc:product.upc,'min-order':product.minOrder,supplier:product.suppliers});
							return $scope.generatedOrder;
						}

					}
				});
				angular.forEach($scope.generatedOrder, function(order){
					angular.forEach(order.supplier, function(supplier){
						if ($scope.supplierList.indexOf(supplier.name) === -1) {
							$scope.supplierList.push(supplier.name);
						}

					});
				});
				for(var i=0;i<Object.keys($scope.generatedOrder).length ;i++){
					for(var j=0;j<$scope.supplierList.length;j++){
						if (!angular.isArray(supplierResults[$scope.supplierList[j]])){
							supplierResults[$scope.supplierList[j]] = [];
						}
						if ($scope.generatedOrder[i].supplier !== undefined){
							if ( $scope.generatedOrder[i].supplier['0'].name === $scope.supplierList[j]) {
								supplierResults[$scope.supplierList[j]].unshift($scope.generatedOrder[i]);
								$scope.supplierResults = supplierResults;
								//data.orders.fire.$save('harp');

							}
						}
					}
				}
				$scope.finalArray =[];
				for (var items in supplierResults){
					$scope.finalArray.push( supplierResults[items] );
				}
				console.log($scope.finalArray);
				angular.forEach($scope.finalArray, function(value){
					$scope.supplierResults[value[0].supplier[0].name] = value;
				});
				angular.forEach($scope.supplierResults, function(key,value){
					console.log(key+ value);

				},i);
				console.log($scope.lastFinalValue);
				return $scope.lastFinalValue;
			}
		},
		templateUrl: 'mngr.utility/directive/purchaseOrder.html',
		link: function(scope, element, attrs, fn) {

		}
	};
});
