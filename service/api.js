angular.module('mngr').factory('api',function(data, $state) {

	var api = {
		state: $state,
		create:function(type, model){
			this.model = model;
			//ecodocs takes a reference to firebase and $adds a model.
			data[type].$add(this.model);
			this.model[type] = {};
		},
		save:function(type, id){
			data[type].$save(id);
		},
		set:function(type, id, model){
			//ecodocs inits an object and creates a child with provided id.
			var object={};
			object[id] = model;
			data[type].$set(object);
		},
		update:function(type, id, model){
			//ecodocs inits an object and creates a child with provided id.
			var object={};
			object[id] = model;
			data[type].$update(object);
		},
		remove:function(type, id){
			data[type].$remove(id);
		}
	};

	return api;
});