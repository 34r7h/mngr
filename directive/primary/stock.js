angular.module('mngr').directive('stock', function(ui,data,api) {
	return {
		controller: function($scope){
			$scope.showTable=true;
			$scope.sortables = {};
			$scope.filters = {};
			$scope.api = api;
			$scope.$watch("data.products", function() {
				$scope.filteredData = data.products;
			}, true);

		},
		scope:{},
		restrict: 'EA',
		template: '<mngr-table ng-show="showTable"></mngr-table><mngr-item ng-show="showItem" item="showItem"></mngr-item>',
		link: function(scope, element, attrs, fn) {


		}
	};
});