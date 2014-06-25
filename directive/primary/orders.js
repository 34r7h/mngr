angular.module('mngr').directive('orders', function(ui,data,api,models) {
	return {
		restrict: 'EA',
		template: '<mngr-table ng-show="showTable"></mngr-table>' +
			'<mngr-form ng-show="showForm"></mngr-form>' +
			'<mngr-item ng-show="showItem" item="showItem"></mngr-item>',
		controller: function($scope){
			$scope.showTable=true;
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

			$scope.sortables = models.sortables.orders;
			$scope.sortablesLength = (100/$scope.sortables.length);
			$scope.filters = {};
			$scope.api = api;
			// ecodocs must watch the double binding on ng-repeats because angular's digest cycle throws a circular reference.

			$scope.table.data.$on('value', function(){
				data.orders.$bind($scope,'filteredData');
			});
		},
		scope:{},
		link: function(scope, element, attrs, fn) {


		}
	};
});