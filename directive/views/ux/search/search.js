angular.module('mngr').directive('search', function(models, data) {
	return {
		restrict: 'E',
		replace: true,
		controller: function($scope){
			$scope.hideFilters = true;
			$scope.hideSortables = true;
		},
		scope: {
            searchable: '=?'
		},
		templateUrl: 'directive/views/ux/search/search.html',
		link: function(scope, element, attrs, fn) {
            // ecodocs: by providing the optional searchable attribute, we can customize the search for specific data types
            // ecodocs: if no searchable content provided, we use models.searchable as default
            scope.searchable = angular.isDefined(attrs.searchable)?(angular.isArray(scope.searchable)?scope.searchable:[scope.searchable]):models.searchable;
            scope.workspace = 'main'; // this is where search will target its links
            scope.searchType = '';

            scope.searchFilter = {
                name: 'Search',
                type: 'text',
                model: '$',
                value: '',
                priority: 0
            };

            scope.$watch('searchable', function(){
                // activate first searchable type as default searchType
                if(!scope.searchType && scope.searchable.length){
                    scope.searchType = scope.searchable[0];
                }
            });
            scope.$watch('searchType', function(){
                // when searchType is selected, configure the table with its data and filters
                var filters = angular.copy(models.filters[scope.searchType]);
                filters.unshift(scope.searchFilter);
                scope.table = {
                    show:'',
                    sortables : angular.copy(models.sortables[scope.searchType]),
                    filters: filters,
                    data: data[scope.searchType]
                };
            });


		}
	};
});
