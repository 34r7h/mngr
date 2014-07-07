angular.module("mngr.utility").filter('mngrStartAt', function(){
    return function(input, offset) {
        return ((angular.isArray(input) && offset < input.length)?input.slice(offset):[]);
    };
});