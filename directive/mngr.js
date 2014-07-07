angular.module('mngr').directive('mngr', function($compile, $timeout) {
	return {
		restrict:"E",
		replace:true,
		scope:{element:"=",params:"=",type:"=",workspace:"@"},
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
<<<<<<< HEAD
            scope.$watchCollection('params', function(newVal){
                if(domElement && newVal){
                    angular.forEach(domElement.attributes, function(name, index){
                        domElement.removeAttribute(name.name);
                    });
                    angular.forEach(newVal, function(value, name){
                        domElement.setAttribute(name, '\''+value+'\'');
                    });
                    $compile(domElement)(scope);
                }
            });
=======
			scope.$watchCollection('params', function(newVal){
				if(domElement && newVal){
					angular.forEach(domElement.attributes, function(name, index){
						domElement.removeAttribute(name.name);
					});
					angular.forEach(newVal, function(value, name){
						domElement.setAttribute(name, '\''+value+'\'');
					});
					$compile(domElement)(scope);
				}
			});
>>>>>>> f9aec33bf4ece5208ea9d68ea4d58398e8668895
		}
	};
});