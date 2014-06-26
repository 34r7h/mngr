angular.module("mngr").directive("mngrInput", function($compile){
		return {
			restrict:"E",
			controller:function($scope){
				var properties=[
					'defaultValue','disabled','form','list','max','min','name','step','type','value','size'
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
			},
			scope:{element:"=", properties:"=", options:"=", type:"=", model:"=ngModel", placeholder:'@', name:'@'},
			link:function(scope, iElem, iAttrs) {

				var angElement = angular.element(document.createElement(scope.element));
				angElement.attr('name', scope.name);
				angElement.attr('properties', scope.properties);
				angElement.attr('options', scope.options);
				angElement.attr('id', scope.name);
				angElement.attr('ng-model', 'model');
				if(scope.element === 'input'){
					angElement.attr('type', scope.type);
				}
				$compile(angElement)(scope);
				iElem.append(angElement);
			}
		};
	}
);