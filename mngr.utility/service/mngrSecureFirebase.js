angular.module('mngr.utility').factory('mngrSecureFirebase',function(Firebase, $firebase) {
    // secured replica of $firebase - provides same interface as $firebase() object
    function MngrSecureFirebase(type, user){
        var mngrSecureFirebase = {
            $add: function(value){
                if(this.$security.fire){
                    return this.$security.fire.$add(value);
                }
            },
            $remove: function(key){
                if(this.$security.fire){
                    return this.$security.fire.$remove(key);
                }
            },
            $save: function(key){
                if(this.$security.fire){
                    return this.$security.fire.$save(key);
                }
            },
            $child: function(key){
                if(this.$security.fire){
                    return this.$security.fire.$child(key);
                }
                return this.$security.getChild(key);
            },
            $set: function(value){
                if(this.$security.fire){
                    return this.$security.fire.$set(value);
                }
            },
            $update: function(value){
                if(this.$security.fire){
                    return this.$security.fire.$update(value);
                }
            },
            $getIndex: function(){
                if(this.$security.fire){
                    return this.$security.fire.$getIndex();
                }
                return this.$security.getChildKeys();
            },
            $transaction: function(updateFn, applyLocally){
                if(this.$security.fire){
                    return this.$security.fire.$transaction(updateFn, applyLocally);
                }
            },
            $on: function(eventName, handler){
                if(this.$security.fire){
                    return this.$security.fire.$on(eventName, handler);
                }
            },
            $off: function(eventName, handler){
                if(this.$security.fire){
                    return this.$security.fire.$off(eventName, handler);
                }
            },

            $security: {
                ref: null,  // Firebase reference
                fire: null, // null unless a user has root access for this type (ie. public or role-access)
                children: {},   // object of child $firebase()'s for user-level access
                type: type,
                user: user,
                getChild: function(key){
                    if(this.allowed(key)){
                        if(!this.children[key]){
                            this.children[key] = $firebase(this.ref.child(key));
                        }
                        return this.children[key];
                    }
                    return null;
                },
                getChildKeys: function(){
                    return Object.keys(this.children);
                },
                loadForUser: function(){
                    // loads all children of <type> that user knows about (ie. id's listed in user/<type>)
                    if(this.type.access.indexOf('user')!==-1 && angular.isObject(this.user[this.type.name])){
                        angular.forEach(this.user[this.type.name], function(allowed, key){
                            if(allowed){
                                mngrSecureFirebase.$security.getChild(key);
                            }
                        });
                    }
                },
                allowed: function(key){
                    var result = false;
                    if(this.publicAllowed()){
                        result = true;
                    }
                    else{
                        angular.forEach(this.type.access, function(access){
                            if(!result){
                                if(access === 'user' && mngrSecureFirebase.$security.userAllowed(key)){
                                    result = true;
                                }
                                else if(access !== 'public' && mngrSecureFirebase.$security.roleAllowed(access)){
                                    result = true;
                                }
                            }
                        });
                    }
                    return result;
                },
                publicAllowed: function(){
                    return (this.type.access.indexOf('public')!==-1);
                },
                roleAllowed: function(role){
                    return (this.type.access.indexOf(role)!==-1 && angular.isObject(this.user.roles) && this.user.roles[role]);
                },
                userAllowed: function(key){
                    var result = false;
                    // user-level access can never be granted unless there is a key associated
                    if(angular.isDefined(key)){
                        // they have access if the key is found in the user's list of entries for the type
                        // this is client-side security only.  server-side security rules must also be set up to avoid client-side spoofing
                        // when proper server-side security rules are set, any spoof attempts would return a firebase "permission denied"
                        if(angular.isObject(this.user[this.type.name]) && this.user[this.type.name][key]){
                            result = true;
                        }
                    }
                    return result;
                }
            }
        };

        // initialize security information

        // ensure type.access is always an array (for ease of use)
        if(angular.isString(type.access)){
            mngrSecureFirebase.$security.type.access = [type.access];
        }

        // get a reference to the type's root
        mngrSecureFirebase.$security.ref = new Firebase("https://mngr.firebaseio.com/"+type.name);

        // load the data based on user's access level
        if(mngrSecureFirebase.$security.allowed()){
            // create the $firebase object if the user has root access for this type
            mngrSecureFirebase.$security.fire = $firebase(mngrSecureFirebase.$security.ref);
        }
        else{
            // no root access, load what we can for the user
            mngrSecureFirebase.$security.loadForUser();
        }

        return mngrSecureFirebase;
    }

    return function(type, user){
        return new MngrSecureFirebase(type, user);
    };
});