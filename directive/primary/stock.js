angular.module('mngr').directive('stock', function(ui,data,api,models) {
	return {
		controller: function($scope){

			$scope.showTable=models.table.showTable;
			$scope.showItem=false;
			$scope.showForm=false;

			$scope.table = {
				show:'',
				sortables : models.sortables.products,
				filters: models.filters.products,
				data: data.products
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

			$scope.sortables = ui.sortables.products;
			$scope.sortablesLength = (100/$scope.sortables.length);
			$scope.filters = {};
			$scope.api = api;
			// ecodocs must watch the double binding on ng-repeats because angular's digest cycle throws a circular reference.
			$scope.$watch("$scope.table.data", function() {
				$scope.filteredData = data.products;
			}, true);

		},
		scope:{},
		restrict: 'EA',
		template: '<mngr-table ng-show="showTable"></mngr-table><mngr-item ng-show="showItem" item="showItem"></mngr-item>',
		link: function(scope, element, attrs, fn) {


		}
	};
});