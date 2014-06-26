angular.module('mngr', ['ui.utils','ui.router','ngAnimate', 'firebase', 'mngr.utility']);

angular.module('mngr').config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('main', {
		url:'*path?role&preferences&history&store&overlay&main&leftbar&rightbar&event&info&inventory&activity&message&order&product',
		reloadOnSearch: false,
		controller: ['$scope','$location','ui', 'models', 'data', 'api' ,function($scope, $location, ui, models, data, api){
			ui.loadState(angular.copy($location.path()), angular.copy($location.search()));
			$scope.$on('$locationChangeStart', function(){
				ui.loadState(angular.copy($location.path()), angular.copy($location.search()));
			});
			$scope.api = api;
			$scope.ui = ui;
			$scope.models = models;
			$scope.data = data;

		}],
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
