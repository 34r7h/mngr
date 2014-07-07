angular.module('mngr').directive('mngrLink', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			link:'@',
			content:'@'
		},
		templateUrl: 'directive/views/mngrLink/mngrLink.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});
