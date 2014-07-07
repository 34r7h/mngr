angular.module('mngr').directive('mngrItem', function($timeout) {

	return {
		restrict: 'E',
		replace: true,
		controller: function($scope){
			$scope.header = $scope.$parent.header;

		},
		scope: {
			item: '='
		},
		templateUrl: 'directive/views/mngrItem/mngrItem.html',
		link: function($scope, element, attrs, fn) {

		}
	};
});
