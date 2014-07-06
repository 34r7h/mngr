angular.module('mngr').directive('mngrButton', function($compile) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			title:'@',
			content:'@',
			action:'@'
		},
		templateUrl: 'directive/views/mngrButton/mngrButton.html',
		link:function(scope, iElem, iAttrs, element, $scope, attrs) {
			var domElement;
			scope.$watch('element', function(newVal){
				if(newVal && (!domElement || !domElement.nodeName || newVal.toLowerCase() !== domElement.nodeName.toLowerCase())){
					domElement = document.createElement(newVal);
					iElem.empty();
					iElem.append(domElement);
					$compile(domElement)(scope);
				}
				else if(!newVal && domElement){
					domElement = null;
					iElem.empty();
				}
			});
		}
	};
});
