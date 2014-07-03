angular.module('mngr').factory('api',function(data, models, ui, $q, $filter) {

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
            data[type].fire[id]['updated'] = time; // does the same thing, but with only 1 firebase call
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
                    console.log('user authenticated...');
                    api.loadProfile(result).then(api.callbackSuccess, api.callbackError);
                }
                else if(result.new && result.linked){
                    console.log('new user profile...'+JSON.stringify(result));
                    if(result.confirmed){
                        api.createProfile();
                    }
                }
                else if(result.name && result.email){
                    console.log('user profile loaded...'+JSON.stringify(result));
                    ui.loadState();
                }
                else if(angular.isFunction(result.parent) && angular.isFunction(result.name)){
                    console.log('new '+result.parent().name()+' record ('+result.name()+')...');
                    if(result.parent().name() === 'users'){
                        data.user.profile = data['users'].fire.$child(result.name());
                        api.linkProfileAccounts(result.name());
                    }
                }
            }
        },

        // logs a user in via the given provider
        login: function(provider, email, password){
            // handle login request based on provider
            console.log('logging in \''+provider+'\'...');
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
                console.log('$createUser:'+email+';'+password+':'+passwordConfirm+':');
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

        },

        // creates a user profile for a given account
        createProfile: function(){
            if(angular.isDefined(data.user.profile.new)){
                delete data.user.profile.new;
            }
            if(angular.isDefined(data.user.profile.confirmed)){
                delete data.user.profile.confirmed;
            }
            // ecodocs: create the user profile
            console.log('createProfile:'+JSON.stringify(data.user.profile));

            // ecodocs: create the emails entry
            api.create('users', data.user.profile).then(api.callbackSuccess, api.callbackError);
        },
        linkProfileAccounts: function(userID){
            console.log('linkProfileAccounts:'+userID);
            if(data['users'].fire[userID]['linked']){
                angular.forEach(data['users'].fire[userID]['linked'], function(linked, uid){
                    if(linked){
                        api.set('userAccounts', uid, userID);
                    }
                });
            }
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
                // ecodocs: do lookup for account.uid -> userID
                if(data['userAccounts'].fire[account.uid]){
                    data.user.profile = data['users'].fire.$child(data['userAccounts'].fire[account.uid]);
                }

                // ecodocs: if no user found for account, get a new profile...
                if(!data.user.profile){
                    data.user.profile = api.newProfile(account);
                }

                defer.resolve(data.user.profile);
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