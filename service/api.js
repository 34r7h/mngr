angular.module('mngr').factory('api',function(data, models, ui, $q, mngrSecureFirebase) {

	var api = {

		bind:function(type, id, scope){
//			data[type].fire.$child(id).$bind(scope, type+id);
		},
		create:function(type, model){
			//this.model = model;
			//ecodocs takes a reference to firebase and $adds a model.
            //this.model[type] = {};
            return data[type].fire.$add(model); // return the $add promise
		},
		save:function(type, id){
			var time = new Date();
			console.log('At '+time+', saving '+type+ ': '+id);
            data[type].fire.$child(id)['updated'] = time; // does the same thing, but with only 1 firebase call
			data[type].fire.$save(id);
			//data[type].fire.$child(id).$child('updated').$set(time);
		},
		set:function(type, id, model){
			//ecodocs inits an object and creates a child with provided id.
			/**var object={};
			object[id] = model;
			data[type].fire.$set(object);
             // that approach would overwrite the entire data[type] table, leaving only the id:model record
             */
            data[type].fire.$child(id).$set(model);
		},
		update:function(type, id, model){
			//ecodocs inits an object and creates a child with provided id.
			/**var object={};
			object[id] = model;
			data[type].fire.$update(object);
             // that approach would overwrite the full data[type][id] record rather than updating it
             */
            data[type].fire.$child(id).update(model);
		},
		remove:function(type, id){
			data[type].fire.$remove(id);
		},

        loadData: function(){
            var defer = $q.defer();

            var datasLoaded = {};
            angular.forEach(data.types, function(type){
                // only load it if it is not already loaded or is not public (so we aren't reloading public sets)
                if(!data[type.name] || type.access.indexOf('public')===-1){
                    var dataLoaded = $q.defer();
                    datasLoaded[type.name] = dataLoaded.promise;

                    var secureFire = mngrSecureFirebase(type, data.user.profile);
                    data[type.name] = {
                        fire: secureFire,
                        array: []
                    };
                    secureFire.$on('loaded', function(){
                        dataLoaded.resolve(true);
                    });
                    // generate the array every time there is a value
                    secureFire.$on('value', function(){
                        data[type.name].array = secureFire.$asArray();
                    });
                }
            });

            $q.all(datasLoaded).then(function(results){
                defer.resolve(true);
            });

            return defer.promise;
        },

        callbackError: function(error){
            var errorMsg = '';
            if(error){
                if(error.code){
                    switch(error.code){
                        case 'EMAIL_TAKEN':
                            errorMsg = 'Email address is in use';
                            break;
                    }
                }
                else{
                    errorMsg = error;
                }
            }
            if(!errorMsg){
                errorMsg = 'Unknown error occurred';
            }
            // ecodocs: where do we put error messages?
            console.log('Error:'+errorMsg);
        },
        callbackSuccess: function(result){
            if(result){
                if(result.uid){
                    // user authenticated
                    api.loadProfile(result).then(api.callbackSuccess, api.callbackError);
                }
                else if(!result.new && result.name && result.email){
                    // user profile loaded
                    api.loadData().then(function(){
                        ui.loadState();
                    });
                }
                else if(result.new && result.linked){
                    // new user profile
                    if(result.confirmed){
                        api.createProfile();
                    }
                }
                else if(angular.isFunction(result.parent) && angular.isFunction(result.name)){
                    // new record saved
                    switch(result.parent().name()){
                        case 'users':
                            if(data.user.profile.linked){
                                api.linkProfileAccounts(result.name(), data.user.profile.linked).then(function(){
                                    api.login('active'); // profile is created and linked, login to activate
                                });
                            }

                            break;
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
                case 'google':
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
            data.user.auth.$login('password', {email:email, password:password}).then(api.callbackSuccess, api.callbackError);
        },
        // logs in a user by 3rd party provider
        loginProvider: function(provider){
            data.user.auth.$login(provider).then(api.callbackSuccess, api.callbackError);
        },

        // logs a user out
        logout: function(){
            data.user.auth.$logout();
            data.user.profile = null;
            api.loadData();
        },

        // creates a user email/password account
        createAccount: function(email, password, passwordConfirm){
            if(!email){
                api.callbackError('No email');
            }
            else if(!password){
                api.callbackError('No password');
            }
            else if(password.length < 6){
                api.callbackError('Passwords is too short');
            }
            else if(passwordConfirm !== password){
                api.callbackError('Passwords don\'t match');
            }
            else if(api.userEmailExists(email)){
                api.callbackError({code: "EMAIL_TAKEN"});
            }
            else{
                data.user.auth.$createUser(email, password).then(api.callbackSuccess, api.callbackError);
            }
        },

        // removes a user email/password account
        removeAccount: function(email, password){
            if(email && password){
                console.log('removeAccount:'+email+':'+password);
                data.user.auth.$removeUser(email, password).then(api.callbackSuccess, api.callbackError);
            }
        },

        // recovers a user's password
        recoverPassword: function(email){
            console.log('recoverPassword:'+email);
        },

        // changes a user's password
        changePassword: function(email, oldPassword, newPassword){
            console.log('changePassword:'+email);
        },

        // creates a user profile for a given account
        createProfile: function(){
            if(angular.isDefined(data.user.profile.new)){
                delete data.user.profile.new;
            }
            if(angular.isDefined(data.user.profile.confirmed)){
                delete data.user.profile.confirmed;
            }

            // ecodocs: need to create the emails entry
            api.create('users', data.user.profile).then(api.callbackSuccess, api.callbackError);
        },
        linkProfileAccounts: function(userID, accounts){
            var defer = $q.defer();
            var accountsLinked = {};
            angular.forEach(accounts, function(linked, uid){
                if(linked){
                    accountsLinked[uid] = api.set('userAccounts', uid, userID);
                }
            });
            $q.all(accountsLinked).then(function(){
                defer.resolve(true);
            });
            return defer.promise;
        },
        newProfile: function(account){
            var newProfile = null;
            if(account.uid){
                newProfile = {
                    new: true,
                    confirmed: false,   // confirmed===true when the user has confirmed their email address
                    linked: {}
                };
                newProfile.linked[account.uid] = true;

                // set email
                if(account.email){
                    newProfile.email = account.email;
                }
                else if(account.thirdPartyUserData && account.thirdPartyUserData.email){
                    newProfile.email = account.thirdPartyUserData.email;
                }

                // set name
                if(account.displayName){
                    newProfile.name = account.displayName;
                }
                else if(newProfile.email){
                    // no display name, parse it from the email
                    var emailParse = newProfile.email.match(/^(\w+)@/);
                    if(emailParse && emailParse.length > 1){
                        newProfile.name = emailParse[1];
                    }
                }

                // auto-confirm email/password accounts
                if(account.provider==='password' && newProfile.email){
                    newProfile.confirmed = true;
                }

                // set default values for all user profile fields
                angular.forEach(models['users'], function(field){
                    if(angular.isUndefined(newProfile[field.name])){
                        newProfile[field.name] = field.value;
                    }
                });
            }
            return newProfile;
        },

        // loads the user profile for a given account
        loadProfile: function(account){
            var defer = $q.defer();
            if(account.uid){
                // look up user account
                var userAccount = data['userAccounts'].fire.$child(account.uid);
                userAccount.$on('loaded', function(){
                    if(userAccount.$value){
                        // load the profile linked to the account
                        var userProfile = data['users'].fire.$child(userAccount.$value);
                        userProfile.$on('loaded', function(){
                            if(userProfile.$value===null){
                                // this would be if the account.uid is linked to a missing profile
                                data.user.profile = api.newProfile(account);
                                defer.resolve(data.user.profile);
                            }
                            else{
                                data.user.profile = userProfile;
                                defer.resolve(data.user.profile);
                            }
                        });
                    }
                    else{
                        // if no profile linked to the account, create a new profile
                        data.user.profile = api.newProfile(account);
                        defer.resolve(data.user.profile);
                    }
                });
            }
            else{
                defer.reject('No account to load uid for');
            }
            return defer.promise;
        },

        // check if the given email is associated with an existing account
        userEmailExists: function(email){
            // ecodocs: need to implement this
            return false;
        }

	};

	return api;
});