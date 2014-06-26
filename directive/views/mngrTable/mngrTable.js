angular.module('mngr').directive('mngrTable', function() {
	return {
		restrict: 'E',
		replace: true,
		controller:function($scope){

		},
		scope:{},
		templateUrl: 'directive/views/mngrTable/mngrTable.html',
		link: function(scope, element, attrs, fn) {
            scope.sort = {column: '', operator: '', reverse: false, by: function(name){
                if(scope.sort.column !== name){
                    scope.sort.column = name;
                    scope.sort.operator = scope.sort.column;
                    // allow for custom sort functions (or to sort by something besides column name)
                    if(scope.$parent.table.sortables[name] && scope.$parent.table.sortables[name].sortBy){
                        scope.sort.operator = scope.$parent.table.sortables[name].sortBy;
                    }
                    scope.sort.reverse = false;
                }
                else{
                    scope.sort.reverse = !scope.sort.reverse;
                }
            }};

            scope.scroll = {
                perPage: 50,
                offset: 0,
                nextPage: function(){
                    if(scope.$parent.table && scope.$parent.table.data && scope.$parent.table.data.array){
                        var maxOff = (scope.$parent.table.data.array.length - scope.scroll.perPage);
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


		}
	};
});
