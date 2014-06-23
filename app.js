angular.module('mngr', ['ui.utils','ui.router','ngAnimate', 'firebase']);

angular.module('mngr').config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('main', {
		url:'*path?role&preferences&history&store&overlay&main&leftbar&rightbar&event&info&inventory&activity&message&order&product',
		reloadOnSearch: false,
		controller: function($scope, ui, models, data, api, $location){
			ui.loadState(angular.copy($location.path()), angular.copy($location.search()));
			$scope.$on('$locationChangeStart', function(){
				ui.loadState(angular.copy($location.path()), angular.copy($location.search()));
			});

			$scope.ui = ui;
			$scope.models = models;
			$scope.data = data;
			$scope.api = api;
		},
		template: '<main></main>'
	});
    /* Add New States Above */
    $urlRouterProvider.otherwise('/');

});

angular.module('mngr').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
