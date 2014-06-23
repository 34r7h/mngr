angular.module('mngr').directive('stock', function(ui,data,api) {
	return {
		controller: function($scope){
			$scope.showTable=true;
			$scope.sortables = ui.sortables.products;
			$scope.sortablesLength = (100/$scope.sortables.length);
			$scope.filters = {};
			$scope.api = api;
			// ecodocs must watch the double binding on ng-repeats because angular's digest cycle throws a circular reference.
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