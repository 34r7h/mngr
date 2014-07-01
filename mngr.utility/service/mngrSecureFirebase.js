angular.module('mngr.utility').factory('mngrSecureFirebase',function() {
    // secured replica of $firebase - provides same interface as $firebase() object
    function MngrSecureFirebase(type, user){
        return {
            type: type,
            user: user,

            $add: function(value){

            },
            $remove: function(key){

            },
            $save: function(key){

            },
            $child: function(key){

            },
            $set: function(value){

            },
            $update: function(value){

            },
            $getIndex: function(){

            },
            $transaction: function(updateFn, applyLocally){

            },
            $on: function(eventName, handler){

            },
            $off: function(eventName, handler){

            }
        };
    }

    return function(dataType, user){
        return new MngrSecureFirebase(dataType, user);
    };
});