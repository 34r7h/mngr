angular.module('mngr').directive('mngrTable', function(models, api, filter) {
	return {
		restrict: 'E',
		replace: true,
		controller:function($scope){

		},
		templateUrl: 'directive/views/mngrTable/mngrTable.html',
		link: function(scope, element, attrs, fn) {
<<<<<<< HEAD
            scope.bindIt = function(id){
                api.bind(scope.type, id, scope);
            };

            scope.sort = {column: '', operator: '', reverse: false, by: function(name){
                if(scope.sort.column !== name){
                    scope.sort.column = name;
                    scope.sort.operator = scope.sort.column;
                    // allow for custom sort functions (or to sort by something besides column name)
                    if(scope.table.sortables[name] && scope.table.sortables[name].sortBy){
                        scope.sort.operator = scope.table.sortables[name].sortBy;
                    }
                    scope.sort.reverse = false;
                }
                else{
                    scope.sort.reverse = !scope.sort.reverse;
                }
            }};

            scope.scroll = {
                perPage: 75,
                showCount: 75,
                nextPage: function(){
                    if(scope.table && scope.table.filteredData){
                        var maxOff = (scope.table.filteredData.length - scope.scroll.perPage);
                        if(scope.scroll.showCount < maxOff){
                            scope.scroll.showCount += scope.scroll.perPage;
                        }
                        return (scope.scroll.showCount < maxOff);
                    }
                    return false;
                },
                prevPage: function(){
                    /**
                    if(scope.scroll.showCount >= 1){
                        scope.scroll.showCount -= scope.scroll.perPage;
                    }
                     */
                    return (scope.scroll.showCount >= 1);
                }
            };

            // apply filters
            scope.filterData = function() {
                if(scope.table && scope.table.data && scope.table.data.array && scope.table.filters){
                    scope.table.filteredData = filter.applyFilters(scope.table.filters, scope.table.data.array);
                    //scope.scroll.showCount = 0;
                }
            };

            // watch for changes in the source data
            scope.$watch('table.data.array', function(){
                scope.filterData();
            });

            // watch for changes in the filter values
            scope.$watch('table.filters', function(){
                if(scope.table && scope.table.filters){
                    angular.forEach(scope.table.filters, function(filter, filterIdx){
                        scope.$watch('table.filters['+filterIdx+'].value', scope.filterData);
                        if(angular.isDefined(filter.value2)){
                            scope.$watch('table.filters['+filterIdx+'].value2', scope.filterData);
                        }
                        if(angular.isDefined(filter.operand)){
                            scope.$watch('table.filters['+filterIdx+'].operand', scope.filterData);
                        }
                    });
                }
            });
=======
			scope.bindIt = function(id){
				api.bind(scope.type, id, scope);
			};

			scope.sort = {column: '', operator: '', reverse: false, by: function(name){
				if(scope.sort.column !== name){
					scope.sort.column = name;
					scope.sort.operator = scope.sort.column;
					// allow for custom sort functions (or to sort by something besides column name)
					if(scope.table.sortables[name] && scope.table.sortables[name].sortBy){
						scope.sort.operator = scope.table.sortables[name].sortBy;
					}
					scope.sort.reverse = false;
				}
				else{
					scope.sort.reverse = !scope.sort.reverse;
				}
			}};

			scope.scroll = {
				perPage: 5,
				showCount: 25,
				nextPage: function(){
					if(scope.table && scope.table.filteredData){
						var maxOff = (scope.table.filteredData.length - scope.scroll.perPage);
						if(scope.scroll.showCount < maxOff){
							scope.scroll.showCount += scope.scroll.perPage;
						}
						return (scope.scroll.showCount < maxOff);
					}
					return false;
				},
				prevPage: function(){
					/**
					 if(scope.scroll.showCount >= 1){
                        scope.scroll.showCount -= scope.scroll.perPage;
                    }
					 */
					return (scope.scroll.showCount >= 1);
				}
			};

			// apply filters
			scope.filterData = function() {
				if(scope.table && scope.table.data && scope.table.data.array && scope.table.filters){
					scope.table.filteredData = filter.applyFilters(scope.table.filters, scope.table.data.array);
					//scope.scroll.showCount = 0;
				}
			};

			// watch for changes in the source data
			scope.$watch('table.data.array', function(){
				scope.filterData();
			});

			// watch for changes in the filter values
			scope.$watch('table.filters', function(){
				if(scope.table && scope.table.filters){
					angular.forEach(scope.table.filters, function(filter, filterIdx){
						scope.$watch('table.filters['+filterIdx+'].value', scope.filterData);
						if(angular.isDefined(filter.value2)){
							scope.$watch('table.filters['+filterIdx+'].value2', scope.filterData);
						}
						if(angular.isDefined(filter.operand)){
							scope.$watch('table.filters['+filterIdx+'].operand', scope.filterData);
						}
					});
				}
			});

>>>>>>> f9aec33bf4ece5208ea9d68ea4d58398e8668895

		}
	};
});
