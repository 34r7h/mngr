angular.module('mngr').directive('mngrInput', function() {
	return {
		restrict: 'E',
		replace: true,
		controller:function($scope){
			var properties=[
				'defaultValue',
				'disabled',
				'form'
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
		scope: {

		},
		templateUrl: 'directive/views/mngrInput/mngrInput.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});
