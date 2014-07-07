angular.module('mngr').directive('breadcrumbs', function($location) {
	return {
		restrict: 'E',
		replace: true,
		controller: function($scope){
			$scope.location = $location;
		},
		templateUrl: 'directive/views/ux/breadcrumb/breadcrumbs.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});
