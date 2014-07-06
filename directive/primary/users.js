angular.module('mngr').directive('users', function(ui,data,api,models) {
	return {
		controller: function($scope){
			$scope.type = 'users';

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

			$scope.api = api;
			$scope.data = data;

			if($scope.userId){

			}
			else{

			}



		},
		scope:{userId:'='},
		restrict: 'EA',

		// ecodocs: very bad, I know... but using it for dev purposes until mngr-form is ready to go for login
		templateUrl: 'directive/primary/users.html',
		//template: '<mngr-table ng-show="showTable"></mngr-table><mngr-form ng-show="showForm"></mngr-form><mngr-item ng-show="showItem" item="showItem"></mngr-item>',
		link: function(scope, element, attrs, fn) {


		}
	};
});