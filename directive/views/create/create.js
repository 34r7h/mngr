angular.module('mngr').directive('create', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/views/create/create.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});
