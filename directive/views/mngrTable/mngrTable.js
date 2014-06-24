angular.module('mngr').directive('mngrTable', function() {
	return {
		restrict: 'E',
		replace: true,
		controller:function($scope){
			$scope.tableFiltersWidth = 3;
		},
		scope:{},
		templateUrl: 'directive/views/mngrTable/mngrTable.html',
		link: function(scope, element, attrs, fn) {

		}
	};
});
