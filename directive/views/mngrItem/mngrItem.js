angular.module('mngr').directive('mngrItem', function() {
	return {
		restrict: 'E',
		replace: true,
		controller: function($scope){
			$scope.itemActions=[
				{name:'addNew',icon:'fa fa-plus',action:function(){console.log('added new order: 2342');}},
				{name:'addNew',icon:'fa fa-leaf', action:console.log('Added new: Order #435145.')}
			];
		},
		scope: {
			item: '='
		},
		templateUrl: 'directive/views/mngrItem/mngrItem.html',
		link: function($scope, element, attrs, fn) {

		}
	};
});
