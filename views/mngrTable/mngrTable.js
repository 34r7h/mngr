angular.module('mngr').directive('mngrTable', function() {
	return {
		restrict: 'E',
		replace: true,
		scope:{},
		templateUrl: 'views/mngrTable/mngrTable.html',
		link: function(scope, element, attrs, fn) {

		}
	};
});
