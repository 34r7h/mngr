<<<<<<< HEAD
angular.module('mngr').directive('mngrItem', function($timeout) {
=======
angular.module('mngr').directive('mngrItem', function() {
>>>>>>> f9aec33bf4ece5208ea9d68ea4d58398e8668895
	return {
		restrict: 'E',
		replace: true,
		controller: function($scope){
<<<<<<< HEAD
			$scope.header = $scope.$parent.header;
=======
			$scope.itemActions=[
				{name:'addNew',icon:'fa fa-plus',action:function(){console.log('added new order: 2342');}},
				{name:'addNew',icon:'fa fa-leaf', action:console.log('Added new: Order #435145.')}
			];
>>>>>>> f9aec33bf4ece5208ea9d68ea4d58398e8668895
		},
		scope: {
			item: '='
		},
		templateUrl: 'directive/views/mngrItem/mngrItem.html',
		link: function($scope, element, attrs, fn) {

<<<<<<< HEAD



=======
>>>>>>> f9aec33bf4ece5208ea9d68ea4d58398e8668895
		}
	};
});
