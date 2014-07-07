angular.module('mngr').directive('messages', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/support/messages/messages.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});
