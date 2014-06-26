angular.module('mngr').factory('ui',['$q',function($q) {

	var ui = {
		components:[
			{name:'stock',icon:'fa fa-barcode'},
			{name:'shop',icon:'fa fa-gift'},
			{name:'orders',icon:'fa fa-barcode'},
			{name:'users',icon:'fa fa-barcode'},
			{name:'content',icon:'fa fa-barcode'}
		],
		workspace: {
			overlay: {
				show: true,
				component: '',
				view: '',
				icon:'fa fa-leaf'
			},
			workspaces: {
				show: false,
				component: '',
				view: '',
				icon:'fa fa-leaf'
			},
			underlay: {
				show: false,
				component: '',
				view: '',
				icon:'fa fa-leaf'
			}
		},
		filters:{
			products:{}
		},
		iconography: {
			text: false,
			icon: false,
			textIcon: true
		},
		notify:{
			showNotify:false,
			components:[
				{name:'messages', icon:'fa fa-envelope'},
				{name:'events', icon:'fa fa-calendar'},
				{name:'cart', icon:'fa fa-shopping-cart'},
				{name:'notices', icon:'fa fa-globe'}
			],
			notification:''
		},
		breadcrumbs: {
			showBreadcrumbs:false
		},
		create: {
			showOptions: false,
			options: ['products', 'users', 'orders', 'shops', 'messages', 'events','contents'],
			showSpecific: false,
			specific: ''
		},
		omni: {
			showOmni:false
		},
		search: {
			showSearch:false
		},
		nightOrDay: "",
		path:"",
		params:"",
		loadState: function (fromPath, withParams) {
			var path = angular.isDefined(fromPath) ? fromPath : ui.path;
			var params = angular.isDefined(withParams) ? withParams : ui.params;
			var pathLoaded = $q.defer();

			// strip off any leading or trailing /'s from path
			path = (path.charAt(0) === '/') ? path.substr(1) : path;
			path = (path.charAt(path.length - 1) === '/') ? path.substring(0, path.length - 1) : path;

			// ecodocs: component parameter configuration...
			var componentParams = {
				'events': ['eventID'],
				'messages': ['messageID'],
				'orders': ['orderID'],
				'shop': ['path'],
				'stock': ['productID'],
				'users': ['userID'],
				'notifications': ['notificationID'],
				'content': ['contentID'],
				'notes': ['noteID']
			};

			// workspace default components
			var workspaceComponents = {
				'main': '',
				'leftbar': '',
				'rightbar': '',
				'overlay': '',
				'underlay': '',
				'alert': ''
			};

			if (path) {
				// check if first part of path is a defined component
				var pathParts = path.split('/');
				if (pathParts.length && Object.keys(componentParams).indexOf(pathParts[0]) !== -1) {
					workspaceComponents['main'] = path;
					workspaceComponents['overlay'] = path;
				}
				else {
					// first part of path is not a defined component, append it to whatever the default is
					workspaceComponents['main'] = (workspaceComponents['main'] ? workspaceComponents['main'] : 'shop') + '/' + path;
					workspaceComponents['overlay'] = (workspaceComponents['overlay'] ? workspaceComponents['overlay'] : 'shop') + '/' + path;

				}
			}

			// reset workspaces
			ui.workspaces = {};

			// load the directives into the workspaces
			angular.forEach(workspaceComponents, function (component, workspace) {
				// is a component specified for this workspace in the params
				if (params[workspace]) {
					component = params[workspace];
				}
				if (component) {
					if (component.indexOf('/') !== -1) {
						var componentParts = component.split('/');

						// which component is it?
						if (componentParts.length) {
							if (Object.keys(componentParams).indexOf(componentParts[0]) !== -1) {
								component = componentParts[0];
								componentParts = componentParts.slice(1); // first part is handled
							}
						}

						// handle component parameters
						if (componentParts.length && component) {
							var lastParamIdx = -1;
							angular.forEach(componentParts, function (pathPart, paramIdx) {
								if (componentParams[component]) {
									if (paramIdx < componentParams[component].length) {
										lastParamIdx = paramIdx;
										params[componentParams[component][paramIdx]] = pathPart;
									}
									else if (lastParamIdx >= 0) {
										// append to the last parameter we found for this component
										params[componentParams[component][lastParamIdx]] += '/' + pathPart;
									}
								}
							});
						}
					}

					// load the component into the workspace (if it is defined in the componentParams object)
					if (component && Object.keys(componentParams).indexOf(component) !== -1) {
						ui.workspaces[workspace] = {component: component};

						// pull the component's parameters from the params object
						if (componentParams[component].length) {
							angular.forEach(componentParams[component], function (paramName, paramIdx) {
								if (angular.isDefined(params[paramName])) {
									if (!ui.workspaces[workspace].params) {
										ui.workspaces[workspace].params = {};
									}
									ui.workspaces[workspace].params[paramName] = params[paramName];
								}
							});
						}
					}
					else {
						// ecodocs: strange thing with $q notify is that it needs to be in a $scope.$apply() call
						//console.log('Invalid component \''+component+'\' requested for \''+workspace+'\'');
						pathLoaded.notify('Invalid component \'' + component + '\' requested for \'' + workspace + '\'');
					}
				}
			});
			// if pathLoaded has not rejected yet, assume success
			pathLoaded.resolve(true);

			pathLoaded.promise.then(
				function (success) {
					if (success) {
						// ecodocs: we can handle the history here
						if (fromPath !== ui.path) {
							// append the page we are coming from into the history

							// ecodocs: compile path and params into a url-string or push as {path:'',params:''}
							// data.history.push({path: ui.path, params: ui.params});
						}

						ui.path = path;
						ui.params = params;
					}
				},
				function (error) {
					// ecodocs: something failed with loading the state
				},
				function (notification) {
					console.log(notification);
				}
			);

		}
	};
	return ui;
}]);