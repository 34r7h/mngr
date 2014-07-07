angular.module("mngr").directive("mngrInput", function($compile){
		return {
			restrict:"E",
			controller:function($scope){
<<<<<<< HEAD
				/* var properties=[
					'defaultValue','disabled','form','list','max','min','name','step','type','value','size'
=======

				var properties=[
					'defaultValue',
					'disabled',
					'form',
					'list',
					'max',
					'min',
					'name',
					'step',
					'type',
					'value',
					'size'
>>>>>>> f9aec33bf4ece5208ea9d68ea4d58398e8668895
				];
			    var inputs=[
					{type:'text'},
					{type:'number'},
					{type:'checkbox'},
					{type:'select'},
					{type:'range'},
					{type:'file'},
					{type:'password'},
					{type:'radio'}
				];
<<<<<<< HEAD
				*/

=======
>>>>>>> f9aec33bf4ece5208ea9d68ea4d58398e8668895
			},
			templateUrl:'directive/views/mngrInput/mngrInput.html',
			//scope:{element:"@", properties:"@", options:"@", type:"@", model:"@", placeholder:'@', name:'@'},
            scope:{type: '=', name: '@', placeholder: '@', ngModel: '='},
			link:function(scope, iElem, iAttrs) {
                if(angular.isUndefined(iAttrs.placeholder)){
                    iAttrs.placeholder = iAttrs.name;
                }

                /**
				var angElement = angular.element(document.createElement(scope.element));
				angElement.attr('name', scope.name);
				angElement.attr('properties', scope.properties);
				angElement.attr('ng-options', scope.options);
				angElement.attr('id', scope.name);
				angElement.attr('ng-model', 'model');
				if(scope.element === 'input'){
					angElement.attr('type', scope.type);
				}
				$compile(angElement)(scope);
				iElem.append(angElement);
                 */
			}
		};
	}
);