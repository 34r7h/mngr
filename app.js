angular.module('mngr', ['ngSanitize','ngMd5','ui.utils','ui.router','ngAnimate', 'firebase', 'mngr.utility','ngTouch','ngCsv', 'ngLodash'/*, 'ionic'*/]);

angular.module('mngr').config(function($stateProvider, $urlRouterProvider, $compileProvider) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
	$stateProvider.state('main', {
		url:'*path',
		reloadOnSearch: false,
		controller: ['$scope','$location','ui', 'models', 'data', 'api','$window', '$firebase' ,function($scope, $location, ui, models, data, api,$window, $firebase){

			api.loadState(angular.copy($location.path()), angular.copy($location.search()));
			$scope.$on('$locationChangeSuccess', function(){
				api.loadState(angular.copy($location.path()), angular.copy($location.search()));
			});
			$scope.window = $window;
            $scope.api = api;
            $scope.ui = ui;
            $scope.models = models;
            $scope.data = data;
			/* CSV Import
			$scope.soRef = data.new.array;
			$scope.productx = [];
			for(var i=0;i<$scope.soRef.length;i++){
				console.log(i);

				$scope.productx[i] = {};
  			$scope.productx[i].brand='';
						$scope.productx[i]['categories']= $scope.soRef[i].Type;
    			$scope.productx[i]['events']=[];
				$scope.productx[i]['imgUrl']='';
				$scope.productx[i]['lowStock']=$scope.soRef[i].StockMin;
				$scope.productx[i]['messages']=[];
				$scope.productx[i]['minOrder']=[];
				$scope.productx[i]['name']= $scope.soRef[i].Grocery;
				$scope.productx[i]['notes']=[];
				$scope.productx[i]['price']=$scope.soRef[i].CustPrice;
				$scope.productx[i]['quantity'] = '';
				$scope.productx[i]['size']= '';
				$scope.productx[i]['sku']=$scope.soRef[i].OrderCode;
				$scope.productx[i]['stock']='';
				$scope.productx[i]['suppliers']=[{
					caseSize: $scope.soRef[i].OrderUnits,
					name: "UNFI",
					price: $scope.soRef[i].myPrice,
					sku:$scope.soRef[i].OrderCode,
					units:$scope.soRef[i].OrderUnits
				}];
				$scope.productx[i]['tax']= '';
				$scope.productx[i]['units']= $scope.soRef[i].OrderUnits;
				$scope.productx[i]['upc']= $scope.soRef[i].OrderCode;

  }


			/*
			angular.forEach($scope.soRef,function(value){
				$scope.productx[i]['brand']='';
				$scope.productx[i]['categories']= [value.Type];
				$scope.productx[i]['events']=[];
				$scope.productx[i]['imgUrl']='';
				$scope.productx[i]['lowStock']=value.StockMin;
				$scope.productx[i]['messages']=[];
				$scope.productx[i]['minOrder']=[];
				$scope.productx[i]['name']= value.Grocery;
				$scope.productx[i]['notes']=[];
				$scope.productx[i]['price']=value.CustPrice;
				$scope.productx[i]['quantity'] = '';
				$scope.productx[i]['size']= '';
				$scope.productx[i]['sku']=value.OrderCode;
				$scope.productx[i]['stock']='';
				$scope.productx[i]['suppliers']=[{
					caseSize: value.OrderUnits,
					name: "UNFI",
					price: value.myPrice,
					sku:value.OrderCode,
					units:value.OrderUnits
				}];
				$scope.productx[i]['tax']= '';
				$scope.productx[i]['units']= value.OrderUnits;
				$scope.productx[i]['upc']= value.OrderCode;
			},i);

			angular.forEach($scope.productx,function(value){
				console.log(value);

			});
			 */

		}],
		template: '<main></main>'
	});
    /* Add New States Above */
    $urlRouterProvider.otherwise('/');

});

angular.module('mngr').run(function($rootScope, api) {
	//Firebase.enableLogging(true);

    api.loadData().then(function(){
        api.login('active');
    });

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
