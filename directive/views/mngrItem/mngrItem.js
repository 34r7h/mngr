angular.module('mngr').directive('mngrItem', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			item: '='
		},
		templateUrl: 'directive/views/mngrItem/mngrItem.html',
		link: function($scope, element, attrs, fn) {

		}
	};
});
