angular.module('mngr').directive('mngrInput', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
            type: '=', name: '@', placeholder: '@', ngModel: '='
		},
		templateUrl: 'directive/views/mngrInput/mngrInput.html',
		link: function(scope, element, attrs, fn) {
            if(angular.isUndefined(attrs.placeholder)){
                attrs.placeholder = attrs.name;
            }

		}
	};
});
