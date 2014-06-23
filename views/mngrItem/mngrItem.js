angular.module('layout').directive('mngrItem', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			item: '='
		},
		templateUrl: 'app/layout/directive/mngrItem/mngrItem.html',
		link: function($scope, element, attrs, fn) {

		}
	};
});
