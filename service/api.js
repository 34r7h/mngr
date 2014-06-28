angular.module('mngr').factory('api',function(data) {

	var api = {

		bind:function(type, id, scope){
			data[type].fire.$child(id).$bind(scope, type+id);
		},
		create:function(type, model){
			//this.model = model;
			//ecodocs takes a reference to firebase and $adds a model.
			data[type].fire.$add(model);
			//this.model[type] = {};
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

        callbackError: function(error){
        },
        callbackSuccess: function(result){
            if(result){
                if(result.uid){
                    var account = result;
                    data.profile = data.loadUserProfile(account);
                    if(!data.profile){
                        data.profile.new = true;

                        // create from models.users template
                        if(account.provider.email){
                            data.profile.email = account.profile.email;
                        }
                    }
                }
            }
        },

        // logs a user in via the given provider
        login: function(provider, email, password){
            // handle login request based on provider
            switch(provider){
                case 'active':
                    api.loginActive();
                    break;

                case 'password':
                    api.loginPassword(email, password);
                    break;

                case 'facebook':
                case 'twitter':
                    api.loginProvider(provider);
                    break;
            }
        },
        // logs in the active user (ie. by cookie)
        loginActive: function(){
            data.user.auth.$getCurrentUser().then(api.callbackSuccess, api.callbackError);
        },
        // logs in a user by email/password account
        loginPassword: function(email, password){
            console.log('login:'+email+';'+password+':');
            data.user.auth.$login(email, password).then(api.callbackSuccess, api.callbackError);
        },
        // logs in a user by 3rd party provider
        loginProvider: function(provider){
            data.user.auth.$login(provider).then(api.callbackSuccess, api.callbackError);
        },

        // logs a user out
        logout: function(){
            data.user.auth.$logout();
            data.user.profile = null;
        },

        // creates a user email/password account
        createAccount: function(email, password, passwordConfirm){
            console.log('createAccount:'+email+';'+password+':'+passwordConfirm+':');
        },

        // recovers a user's password
        recoverPassword: function(email){
            console.log('recoverPassword:'+email);
        },

        // changes a user's password
        changePassword: function(email, oldPassword, newPassword){

        },



        // creates a user profile for a given account
        createProfile: function(){
            //api.create('users', data.profile);
        },

        // loads the user profile for a given account
        loadProfile: function(account){
            if(account.uid){

            }
        },

        // check if the given email is associated with an existing account
        userEmailExists: function(email){
        },

        // check if the given username is associated with an existing account
        usernameExists: function(username){
        }

	};

	return api;
});