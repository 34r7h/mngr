angular.module('mngr').directive('main', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/views/main.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});
