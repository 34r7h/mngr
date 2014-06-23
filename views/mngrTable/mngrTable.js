angular.module('mngr').directive('mngrTable', function(fb, $filter, $timeout) {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'app/layout/directive/mngrTable/mngrTable.html',
		link: function(scope, element, attrs, fn) {
			scope.sorting = {column: '', by: '', reverse: false};
			scope.sortBy = function(name){
				if(scope.sorting.column !== name){
					scope.sorting.column = name;
					scope.sorting.by = scope.sorting.column;
					// allow for custom sort functions (or to sort by something besides column name)
					if(scope.table.sortables[name] && scope.table.sortables[name].sortBy){
						scope.sorting.by = scope.table.sortables[name].sortBy;
					}
					scope.sorting.reverse = false;
				}
				else{
					scope.sorting.reverse = !scope.sorting.reverse;
				}
			};

			scope.scroll = {
				perPage: 100,
				offset: 0,
				nextPage: function(){
					if(scope.table && scope.table.data){
						var maxOff = (scope.table.data.length - scope.scroll.perPage);
						if(scope.scroll.offset <= maxOff){
							scope.scroll.offset += scope.scroll.perPage;
						}
						return (scope.scroll.offset <= maxOff);
					}
					return false;
				},
				prevPage: function(){
					if(scope.scroll.offset >= 1){
						scope.scroll.offset -= scope.scroll.perPage;
					}
					return (scope.scroll.offset >= 1);
				}
			};

			/**
			 * scope.table.fbData:      firebase 2-way binded data ($firebase object)
			 * scope.table.dataFull:    complete data set as array (orderByPriority)
			 * scope.table.data:        filtered data set as array
			 */

			scope.filtering = false;
			var filterData = function(){
				if(scope.table && scope.table.filters){
					scope.filtering = true;
					scope.table.data = fb.api.applyFilters(scope.table.filters, scope.table.dataFull);
					scope.scroll.offset = 0;
					scope.filtering = false;

				}
			};

			// if we have table.fbData, prepare table.data as a filterable array
			if(scope.table && scope.table.fbData && angular.isFunction(scope.table.fbData.$on)){
				scope.table.fbData.$on('value', function(){
					scope.table.dataFull = $filter('orderByPriority')(scope.table.fbData);
				});
			}

			scope.$watch('table.dataFull', function(){
				filterData();
			});

			// watch the filter values
			scope.$watch('table.filters', function(){
				if(scope.table && scope.table.filters){
					angular.forEach(scope.table.filters, function(filter, filterIdx){
						scope.$watch('table.filters['+filterIdx+'].value', filterData);
						if(angular.isDefined(filter.value2)){
							scope.$watch('table.filters['+filterIdx+'].value2', filterData);
						}
						if(angular.isDefined(filter.operand)){
							scope.$watch('table.filters['+filterIdx+'].operand', filterData);
						}
					});
				}
			});
		}
	};
});
