angular.module('mngr').directive('mngrTable', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'views/mngrTable/mngrTable.html',
		link: function(scope, element, attrs, fn) {

		}
	};
});
