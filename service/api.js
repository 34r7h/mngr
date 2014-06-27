angular.module('mngr').factory('api',function(data, models, $filter) {

	var api = {

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
			var time = new Date();
			console.log('At '+time+', saving '+type+ ': '+id);
			data[type].fire.$save(id);
			data[type].fire.$child(id).$child('updated').$set(time);

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
		},
		applyFilters: function(filters, data){
			var result = data;
			angular.forEach(filters, function(filter, filterIdx){
				var args = api.filterArgs(filter);
				if(args){
					result = $filter('filter')(result, args);
				}
			});
			return result;
		},
		// ecodocs: returns the arguments passed to the angular 'filter'
		filterArgs: function(filter){
			var args = null;
			switch(filter.type){
				case 'text':
					if(filter.value){
						args = {};
						args[filter.model] = filter.value;
					}

					break;

				case 'number':
					if(filter.value || filter.value===0){
						args = function(item){
							var result = false;
							var modelValue = item[filter.model]?item[filter.model]:0;
							var filterValue = filter.value;
							if(modelValue){
								switch(filter.operand){
									case '<':
										result = (modelValue <= filterValue);
										break;

									case '>':
										result = (modelValue >= filterValue);
										break;

									case '><':
										if(filter.value2 || filter.value2===0){
											result = (modelValue >= filterValue && modelValue <= filter.value2);
										}
										else{
											result = (modelValue===filterValue);
										}
										break;

									case '=':
										result = (modelValue===filterValue);
										break;

									default:
										result = (modelValue===filterValue);
										break;
								}
							}
							return result;
						};
					}
					break;

				case 'select':
					args = function(item){
						var result = false;
						var modelValue = item[filter.model];
						if(modelValue){
							if(angular.isArray(modelValue)){
								// ecodocs: loop through each selected value (assumes <select multiple>)
								angular.forEach(filter.value, function(checkValue){
									if(!result && modelValue.indexOf(checkValue)!==-1){
										result = true;
									}
								});
							}
							else{
								// ecodocs: check if modelValue is any of the selected values (assumes <select multiple>)
								if(filter.value.indexOf(modelValue)!==-1){
									result = true;
								}
							}

						}
						return result;
					};
					break;

				// ecodocs: add other filter.types
			}
			return args;
		}
	};

	return api;
});