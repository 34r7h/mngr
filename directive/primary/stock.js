angular.module('mngr').directive('stock', function(ui,data) {
	return {
		controller: function($scope){
			$scope.showTable = true;
			$scope.table = {
				sortables : ui.sortables.products,
				filters: ui.filters.products,
				fbData: data.products
			};
			$scope.item = {
				header:{},
				details:{},
				actions:{},
				media:{}
			};
			$scope.$watchCollection('params', function(){
				if($scope.params && $scope.params['productID']){
					$scope.showItem = {$id: $scope.params['productID'], name: 'Invalid Product: #'+$scope.params['productID']+'!'};
					if($scope.table.fbData[$scope.params['productID']]){
						$scope.showItem = $scope.table.fbData[$scope.params['productID']];
					}
					$scope.showTable = false;
				}
				else{
					$scope.showTable = true;
					$scope.showItem = false;
				}
			});
		},
		restrict: 'EA',
		template: '<mngr-table ng-show="showTable"></mngr-table><mngr-item ng-show="showItem" item="showItem"></mngr-item>',
		link: function(scope, element, attrs, fn) {


		}
	};
});