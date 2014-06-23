angular.module('mngr').directive('omni', function(ui) {
	return {
		restrict: 'E',
		replace: true,
		controller:function($scope){
			$scope.workspaces = ui.workspace;
			$scope.workspacesLength = Object.keys(ui.workspace);
			$scope.components = ui.components;
		},
		scope: {

		},
		templateUrl: 'views/omni/omni.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});
