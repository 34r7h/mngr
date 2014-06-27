angular.module('mngr').factory('api',function(data, models, utility, $filter) {

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

        // logs a user in via the given provider
        login: function(provider){
            // handle login request based on provider
            switch(provider){
                case 'active':
                    api.loginActive();
                    break;

                case 'password':
                    api.loginPassword(data.user.account.email, data.user.account.password);
                    break;

                case 'facebook':
                case 'twitter':
                    api.loginProvider(provider);
                    break;
            }

        },
        // logs in the active user (ie. by cookie)
        loginActive: function(){
            data.user.auth.$getCurrentUser().then(utility.userAuthenticated);
        },
        // logs in a user by email/password account
        loginPassword: function(email, password){

        },
        // logs in a user by 3rd party provider
        loginProvider: function(provider){

        },

        // logs a user out
        logout: function(){

        },

        // registers a new user account
        register: function(){

        },

        // changes a user's password
        changePassword: function(email, oldPassword, newPassword){

        },

        // recovers a user's password
        recoverPassword: function(email){

        },

        // data filtering
		applyFilters: function(filters, data){
			var result = data;
			angular.forEach(filters, function(filter, filterIdx){
				var args = utility.filterArgs(filter);
				if(args){
					result = $filter('filter')(result, args);
				}
			});
			return result;
		}

	};

	return api;
});