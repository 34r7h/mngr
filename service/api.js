angular.module('mngr').factory('api',function(data, $state) {

	var api = {
		state: $state,
		bind:function(type, id, scope){
			data[type].fire.$child(id).$bind(scope, type+id);
		},
		create:function(type, model){
			this.model = model;
			//ecodocs takes a reference to firebase and $adds a model.
			data[type].fire.$add(this.model);
			this.model[type] = {};
		},
		save:function(type, id){
			console.log('saving '+type+ ': '+id);
			data[type].fire.$save(id);
		},
		set:function(type, id, model){
			//ecodocs inits an object and creates a child with provided id.
			var object={};
			object[id] = model;
			data[type].fire.$set(object);
		},
		update:function(type, id, model){
			//ecodocs inits an object and creates a child with provided id.
			var object={};
			object[id] = model;
			data[type].fire.$update(object);
		},
		remove:function(type, id){
			data[type].fire.$remove(id);
		}
	};

	return api;
});