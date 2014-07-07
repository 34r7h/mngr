angular.module('mngr').directive('main', function() {
	return {
		restrict: 'E',
		replace: true,
		controller: function($scope){

		},
		templateUrl: 'directive/views/main.html',
		link: function(scope, element, attrs, fn) {

		}
	};
});
