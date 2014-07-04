angular.module('mngr').directive('stock', function(ui,data,api,models) {
	return {
		controller: function($scope){
			$scope.type = 'products';
			$scope.showTable=true;
			$scope.showItem=false;
			$scope.showForm=false;

			$scope.table = {
				show:'',
				sortables : models.sortables[$scope.type],
				filters: models.filters[$scope.type],
				data: data[$scope.type]
			};
			$scope.item = {
				id:'',
				name:'',
				header:{
					title:'',
					quickEdit:[{}],
					quickInfo:[{}]
				},
				details:[{
					name:'',
					value:''
				}],
				actions:{},
				// ecodocs interactions are allowed modules within an item
				interactions:{},
				media:{}
			};
			$scope.form = {
				model:'',
				name:'',
				sections:[{
					name:'',
					icon:'',
					inputs:[{
						model:'',
						icon:'',
						type:'',
						options:[{name:'',value:''}],
						help:''
					}]
				}],
				confirm:{}

			};

            if($scope.productId){
                $scope.showTable = false;
                $scope.showItem = true;
                $scope.product = data[$scope.type].fire.$child($scope.productId);
            }
            else{
                $scope.showTable = true;
            }




		},
		scope:{productId:'='},
		restrict: 'EA',
		template: '<mngr-table ng-show="showTable"></mngr-table><mngr-form ng-show="showForm"></mngr-form><mngr-item ng-show="showItem" item="product"></mngr-item>',
		link: function(scope, element, attrs, fn) {


		}
	};
});