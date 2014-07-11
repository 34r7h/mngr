# MNGR
![alt text](https://lh5.googleusercontent.com/CSNN23iyh6lXba1YoTqFwnLMTGd8TPRadVpRBng1c9s=w723-h844-no "MNGR, Crossing the finishline with you.")
## MNGR manages retail business needs
While the common brick and mortar business isn't a sexy sector in tech, they do have specific needs to have covered.
* **Inventory**
  Keeping track of stock is a must in retail. The tighter an app can manage the amounts and whereabouts of products, less shrink and better decisions.
* **Orders**
  Orders keep track of values for the business. Orders are not just sales, but supplier orders, employee payroll and other associated costs to the business.
* **People**
  Tight as well is the actual management of people. Managers, suppliers, customers, employees and employees can interact with each other through messaging, events, and notice, all with the privacy controls we've come to expect nowadays.

## States
====
### 1. Authenticated
  * Customer
  * Employee
  * Manager
  * Admin
  
### 2. Workspaces
  * Overlay
  * Underlay
  * left
  * middle
  * right
  * alert

## Directory Structure
====
* **Directive**
  * **primary**
    contents
    orders
    shop
    stock
    users
  * **support**
    messages
    events
    notes
    notices
  * **views**
    mngrTable
    mngrItem
    mngrForm
    breadcrumb
    create
    notify
    omni
    search
    main
  * mngr
* **service**
  ** api
  ** data
  ** models
  ** ui
* app.js
* index.html

## Basic App Pattern
====
Primary and support directives scope data from services to display on the view directives.
For ex. calling the stock directive to the main workspace with a single product means that main workspace will have the stock directive with mngrItem showing that product.
### Views
  * **mngrItem** - Takes a single object and single item model
  * **mngrTable** - Takes a list of objects and table model
  * **mngrForm** - Takes a model and modifies/creates an object
  * **mngrInput** - modifies/creates a model
  * **mngrContent** - Displays a model
  * **mngrButton** - Displays a button, takes action on a model

### Data service
====
When the system starts, it loads all data tables defined in the data['types'] list.

Access definitions:
Each data type is defined with a name and an array of access permissions.  The available permissions are as follows:
  * public - publicly available data
  * user - user-specific data (each record contains a list of users associated with it, and each user profile keeps a list of the data id's it has access to)
  * <role> - role-based access.  any entry in the access list that is not 'public' or 'user' is treated as a role, allowing users with the role access to the data.

For each data type that is loaded, the data service creates an object containing the following 2 items:
  * fire - mngrSecureFirebase object (see details below)
  * array - an array of the data, ordered by priority.  Each item in the array has an id property.  Array is provided primarily for use with filters.

An item of type can be therefore be accessed in one of 2 ways:
  * data[type].fire.$child(id)
  * data[type].array[index]

mngrSecureFirebase
To allow secured user-specific data, mngr provides the mngrSecureFirebase object which simulates the $firebase object, but allows access only to children which the user has permissions for.
Each instance of mngrSecureFirebase is initialized with the data[type] definition and the user object.
A special case where mngrSecureFirebase is initialized with no arguments as mngrSecureFirebase() provides the $firebaseSimpleLogin authentication object.
mngrSecureFirebase provides the following functions:
  * $add(value) - adds a new entry
  * $remove(key) - removes an entry
  * $save(key) - saves an entry
  * $child(key) - gets a $firebase reference of an entry
  * $set(value) - since it would be attempting to set the entire table for the data type, does nothing unless user has public or role access, in which case it uses the standard $firebase().$set(value) function.  For setting a specific child use data[type].fire.$child(key).$set(value)
  * $update(value) - since it would be attempting to update the entire table for the data type, does nothing unless user has public or role access, in which case it uses the standard $firebase().$update(value) function.  For updating a specific child use data[type].fire.$child(key).$update(value)
  * $getIndex() - gets an array of all data keys
  * $transaction(updateFn, applyLocally) - does nothing unless user has public or role access, in which case it uses the standard $firebase().$transaction(updateFn, applyLocally) function.
  * $on(eventName, handler) - registers an event handler (see https://www.firebase.com/docs/angular/reference.html#on-eventname-handler for supported event types)
  * $off(eventName, handler) - removes an event handler (see https://www.firebase.com/docs/angular/reference.html#off-eventname-handler for supported event types)
  * $getRef() - gets the vanilla-javascript Firebase reference (see https://www.firebase.com/docs/javascript/firebase/ for documentation)
  * $asArray() - gets the data set as an array
  * $addToUsers(key, userIDs) - adds the key to each userID found in the userIDs list.  For the current logged in user, writes directly to their profile.  For all other users, writes to their dataQueue for the data type as <key>:true
  * $removeFromUsers(key, userIDs) - removes the key from each userID found in the userIDs list.  For the current logged in user, removes directly from their profile.  For all other users, writes to their dataQueue for the data type as <key>:false
  * destroy() - removes all event listeners from the data objects.  For security reasons, this should be called before reloading the data type.

In most cases, the api should be used for updates to the data tables.
The api provides the following data access functions:
  * create(type, model) - creates a new entry of type and with value of model. If model.users exists, adds the new entry ID to each user profile.
  * save(type, id) - saves an entry of type and matching id, using the value currently stored for it.  If the entry contains a users list, updates each user profile by adding and removing the entry ID as appropriate.
  * set(type, id, model) - sets an entry of type and matching id, overwriting any existing data in the entry.  If the entry contains a users list, updates each user profile by adding and removing the entry ID as appropriate.
  * update(type, id, model) - updates an entry of type and matching id, modifying only child data provided by the given model.  If the entry contains a users list, updates each user profile by adding and removing the entry ID as appropriate.
  * remove(type, id) - removes an entry of type and matching id.  If the entry contains a users list, removes the entry ID from each user profile.
  * loadData() - loads/reloads all data tables defined in the data['types'] list

  
### Development Pattern (suggested)
  * 1. HTML with dummy data
  * 2. HTML with ng-init data
  * 3. HTML with view $scope'd data
  * 4. HTML with directive $scope'd data
  * 5. HTML with directive $scope'd data from a model service
  * 6. HTML with directive $scope'd from a data service
  
## Linking
====
Links are created by directives or system-based functions like signing in. Each link could have:
  * workspaces
  * directives
  * specific item

mngr provides the mngrLinkTo filter which can be used to target a link path into a specific workspace and has the following arguments:
  * input - a template of the link path (ex. `events/:id`)
  * object - the object to pull replacement values from
  * workspace - the workspace to target the link to.
	
mngrLinkTo allows for replacement tokens in the link template (ex. `:id`).  If the object contains a property matching the replacement token, the generated path will replace the token with the value from the object.

Supported replacement tokens:
  `*` `:id` - replaced with `object.id`

  Example:
    `<a ng-href="{{ 'events/:id | mngrLinkTo:eventObject:'overlay' }}">{{eventObject.name}}</a>`
		
    If `eventObject = {id: '12345', name: 'Foo'};` the filter would generate the following html:
		
    `<a href="*?overlay=events/12345">Foo</a>`
		
  Note that the `*` in the example generated HTML denotes any location.  `mngrLinkTo` preserves the existing location and query arguments, overwriting only the argument for the given workspace.

  If 'main' is given as the workspace, mngrLinkTo uses the generated path as the location, all other workspaces appear as query arguments.
		
## User Accounts
====
User accounts are managed through the users directive, accessible at path '/#/users'
There are two key components to the user account:
  * data.user.auth - the $firebaseSimpleLogin authentication object (see https://www.firebase.com/docs/angular/reference.html#firebasesimplelogin for details)
  * data.user.profile - the mngr user profile, stored in the data['users'] table

Authentication Overview
Once a user has been authenticated through $firebaseSimpleLogin, mngr attempts to load their profile by cross-referencing the data['userAccounts'] table.  When a profile is found, the user is logged in.  If no profile is found, the user is given the option to register a new account.

Account Linking
Since mngr allows a user to login via multiple providers (email/password, facebook, twitter), accounts are linked by the data['userAccounts'] table.
Data in this table is stored in the format of [uid]=userID where uid is the unique id from $firebaseSimpleLogin and is of the format <provider>:<providerID> and userID is the internal mngr user profile id.
Account links are also stored as uid's in the user's 'linked' table under the data['users']/<userID>.

Registration
When a user registers, they are required to provide an email address.  If logging in via a 3rd party (ex. facebook), mngr will pull as much of the user's profile data from the 3rd party account.
Once the user completes registration, a new profile is created and linked to the authentication account.
An email address may be associated with only one account, therefore an md5 hash of every email address is stored in the data['userEmails'] table so that an availability check can be made.

Login
When a user logs in, mngr will reload all the data tables that are not marked as public access (since public data is already loaded), checking for availability with the user's roles and permissions.
In loading the data tables for the user, mngr also checks the user's dataQueue table for any changes to shared user-data and updates the appropriate data list in the user's profile.
After the data tables are reloaded for the user, mngr will reload the state.

Logout
When a user logs out, mngr de-authenticates them with $firebaseSimpleLogin (thus restricting their data access to only public data) and removes all private data from the browser's memory.

mngr's api service provides the following user account functions:
  * login(provider, email, password) - logs in via the provider.  email and password are required only if provider is 'password'. Currently supported providers are: active, password, facebook, twitter, google
  * loginActive() - logs in the account which is currently authenticated with Firebase (called at app start to login in a user who is reloading or returning to the app, but did not logout at the end of their last session)
  * loginPassword(email, password) - logs a user in via email address and password
  * loginProvider(provider) - logs a user in via 3rd-party authentication (facebook, twitter, or google)
  * logout() - ends a user's session by de-authenticating with $firebaseSimpleLogin, and removing their profile and all private data from the browser's memory
  * createAccount(email, password, passwordConfirm) - creates a new email/password account on firebase's server
  * removeAccount(email, password) - removes an existing email/password account from firebase's server
  * recoverPassword(email) - sends a password recovery email for an existing email/password account * ecodocs: Needs to be implemented to call data.user.auth.$sendPasswordResetEmail(email); (https://www.firebase.com/docs/angular/reference.html#sendpasswordresetemail-email)
  * changePassword(email, oldPassword, newPassword) - changes a password for an existing email/password account * ecodocs: Needs to be implemented to call data.user.auth.$changePassword(email, oldPassword, newPassword); (https://www.firebase.com/docs/angular/reference.html#changepassword-email-oldpassword-newpassword)
  * createPofile() - creates a new profile with whatever data is currently in data.user.profile
  * linkProfileAccounts(userID, accounts) - links the uid's provided in the accounts object to the given userID profile
  * newProfile(account) - generates a new user profile structure with data from the supplied authentication account
  * loadProfile(account) - attempts to load the profile for the supplied authentication account (by referencing data['userAccounts']) If no profile is found for the account, generates a new one using api.newProfile(account)
  * userEmailAvailable(email) - returns a promise that is resolved true if the given email address is in use by a user, or false if the email address is not currently in use

  
## Design Guide

### Grid and positioning
  * 13 columns: .col-1 - .col-13
  * 13 rows: .row-1 - .row-13
  * 13 push, 13 pull (left/right): .push-1 - .pull-13
  * 13 lift, 13 drop (up/down): .lift-1 - .drop-13
  * Full height and width: .full
  
  
  * Absolute positioning: .absolute, relative positioning: .relative, fixed positioning: .fixed
  * Top: .top, Bottom: .bottom, Left: .left, Right: .right  
  * Absolute centering: .middle-container (holds the) .middle-content
  * Padding: .pad, No padding: .no-pad
  
  * Overflow control: .scroll-y, .scroll-x, .all-scroll, .no-scroll
  
### UX Patterns
  * Workspaces - control where modules go
    * Overlay
    * Main
    * Left - expands
    * Right - expands
    * Underlay
  * Buttons - mngrButton
  * Content - mngrContent
  * Form - mngrForm
  * Single item - mngrItem
  * Table - mngrTable


### URL and UI Workspaces
  mngr allows its ui-workspaces to be populated by values found in the URL.
  The general format of a workspace path is <component>[/<componentParams>] *
  Workspace paths may be set in the URL as query-variables <workspaceName>=<workspacePath> with the exception of main which can be set as the root path.

  Available <componentParams> are defined for each component in the ui service, and are loaded in the order they are defined.  So if a component has params: [itemID, action], the path would be <componentName>/<itemID>/<action>

  Components are loaded into the HTML via the mngr directive.

  ex.
    the URL `http://example.com/#/stock/<productID>?overlay=events`
    would load the 'stock' component into the main workspace with the given <productID> open; and the 'events' component into the overlay workspace with no specific event open.

  The mngr api provides the following ui functions:
  * loadState(fromPath, withParams) - loads/reloads the app's state with the given path and query-params.  Both path and params are optional, and if omitted will reload the current state with whatever path and params were last passed to loadState.
  * loadPath(path, workspace) - loads a single componentPath into the supplied workspace.  If an invalid componentPath is given, loads the default component as defined in ui service.
  * setWorkspace(workspace, component, params) - populates the ui.workspace object for the given workspace and with the given component and its params

  It should be noted that the main state controller listens for the $locationChangeSuccess and calls loadState to reload the state when the URL has changed.

  
  
Created with Angular JS, Firebase, and Font Awesome. 
Courtesy of Yo! generator: cg-angular 
  