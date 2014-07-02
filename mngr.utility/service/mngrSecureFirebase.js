angular.module('mngr.utility').factory('mngrSecureFirebase',function(Firebase, $firebase) {
    // secured replica of $firebase - provides same interface as $firebase() object
    function MngrSecureFirebase(type, user){
        var mngrSecureFirebase = {
            $add: function(value){
                if(this.$secure.fire){
                    return this.$secure.fire.$add(value);
                }
                return this.$secure.addChild(value);
            },
            $remove: function(key){
                if(this.$secure.fire){
                    return this.$secure.fire.$remove(key);
                }
                return this.$secure.removeChild(key);
            },
            $save: function(key){
                if(this.$secure.fire){
                    return this.$secure.fire.$save(key);
                }
                return this.$secure.saveChild(key);
            },
            $child: function(key){
                if(this.$secure.fire){
                    return this.$secure.fire.$child(key);
                }
                return this.$secure.child(key);
            },
            $set: function(value){
                if(this.$secure.fire){
                    return this.$secure.fire.$set(value);
                }
                return null; // if they don't have root access, they cannot set the root
            },
            $update: function(value){
                if(this.$secure.fire){
                    return this.$secure.fire.$update(value);
                }
                return null; // if they don't have root access, they cannot update the root
            },
            $getIndex: function(){
                if(this.$secure.fire){
                    return this.$secure.fire.$getIndex();
                }
                return this.$secure.childKeys();
            },
            $transaction: function(updateFn, applyLocally){
                if(this.$secure.fire){
                    return this.$secure.fire.$transaction(updateFn, applyLocally);
                }
                return null; // if they don't have root access, they cannot perform transaction on the root
            },
            $on: function(eventName, handler){
                if(this.$secure.fire){
                    return this.$secure.fire.$on(eventName, handler);
                }
            },
            $off: function(eventName, handler){
                if(this.$secure.fire){
                    return this.$secure.fire.$off(eventName, handler);
                }
            },

            $secure: {
                ref: null,  // Firebase reference
                fire: null, // null unless a user has root access for this type (ie. public or role-access)
                children: {},   // object of child $firebase()'s for user-level access
                type: type,
                user: user,
                child: function(key){
                    if(this.permit(key)){
                        if(!this.children[key]){
                            this.children[key] = $firebase(this.ref.child(key));
                        }
                        return this.children[key];
                    }
                    return null;
                },
                childKeys: function(){
                    return Object.keys(this.children);
                },
                addChild: function(value){
                    // ecodocs: push the child
                },
                removeChild: function(key){
                    var child = this.child(key);
                    if(child){
                        child.$remove();
                    }
                },
                saveChild: function(key){
                    var child = this.child(key);
                    if(child){
                        child.$save();
                    }
                },
                loadForUser: function(){
                    // loads all children of <type> that user knows about (ie. id's listed in user/<type>)
                    if(this.type.access.indexOf('user')!==-1 && angular.isObject(this.user[this.type.name])){
                        angular.forEach(this.user[this.type.name], function(allowed, key){
                            if(allowed){
                                mngrSecureFirebase.$secure.child(key);
                            }
                        });
                    }
                },
                permit: function(key){
                    var result = false;
                    if(this.publicAllowed()){
                        result = true;
                    }
                    else{
                        angular.forEach(this.type.access, function(access){
                            if(!result){
                                if(access === 'user' && mngrSecureFirebase.$secure.userAllowed(key)){
                                    result = true;
                                }
                                else if(access !== 'public' && mngrSecureFirebase.$secure.roleAllowed(access)){
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
                        // user has access if key is found in their list of entries for the type
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
            mngrSecureFirebase.$secure.type.access = [type.access];
        }

        // get a reference to the type's root
        mngrSecureFirebase.$secure.ref = new Firebase("https://mngr.firebaseio.com/"+type.name);

        // load the data based on user's access level
        if(mngrSecureFirebase.$secure.permit()){
            // create the $firebase object if the user has root access for this type
            mngrSecureFirebase.$secure.fire = $firebase(mngrSecureFirebase.$secure.ref);
        }
        else{
            // no root access, load what we can for the user
            mngrSecureFirebase.$secure.loadForUser();
        }

        return mngrSecureFirebase;
    }

    return function(type, user){
        return new MngrSecureFirebase(type, user);
    };
});