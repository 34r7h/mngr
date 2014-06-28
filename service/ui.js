angular.module('mngr').factory('ui',['$q',function($q) {

	var ui = {
		components:[
			{name:'stock',icon:'fa fa-barcode',params:['productID']},
			{name:'shop',icon:'fa fa-gift',params:['path'],default:true},
			{name:'orders',icon:'fa fa-barcode',params:['orderID']},
			{name:'users',icon:'fa fa-barcode',params:['userID']},
			{name:'content',icon:'fa fa-barcode',params:[]}
		],
		workspace: {
			overlay: {
				show: false,
				component: '',
                params: {},
				view: '',
				icon:'fa fa-leaf'
			},
			main: {
				show: true,
				component: '',
                params: {},
				view: '',
				icon:'fa fa-leaf'
			},
			underlay: {
				show: false,
				component: '',
                params: {},
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
				{name:'messages', icon:'fa fa-envelope', params:['messageID']},
				{name:'events', icon:'fa fa-calendar', params:['eventID']},
				{name:'cart', icon:'fa fa-shopping-cart', params:['orderID']},
				{name:'notices', icon:'fa fa-globe', params:[]}
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
        setWorkspace: function(workspace, component, params){
            if(Object.keys(ui.workspace).indexOf(workspace)!==-1){
                // load the component into the workspace
                ui.workspace[workspace].component = component.name;

                // reset any existing parameters in this workspace
                angular.forEach(ui.workspace[workspace].params, function(value, name){
                    delete ui.workspace[workspace].params[name];
                });

                // load the parameters we are given
                if(angular.isArray(params)){
                    // for array params - load the params in the order the component defines them
                    angular.forEach(component.params, function(name, index){
                        if(index < params.length){
                            ui.workspace[workspace].params[name] = params[index];
                        }
                    });

                    // if there are more params than component is configured for, append the extra params onto the last configured param
                    if(params.length > component.params.length){
                        var lastParam = component.params[component.params.length-1];
                        ui.workspace[workspace].params[lastParam] += (ui.workspace[workspace].params[lastParam]?'/':'')+params.slice(component.params.length).join('/');
                    }
                }
                else if(angular.isObject(params)){
                    // for object params - set the params that are defined for the component
                    angular.forEach(params, function(value, name){
                        if(component.params.indexOf(name)!==-1){
                            ui.workspace[workspace].params[name] = value;
                        }
                    });
                }
            }
        },
        loadPath: function(path, workspace){
            if(Object.keys(ui.workspace).indexOf(workspace)!==-1){
                // valid workspace, load the path into the ui

                // strip off any leading or trailing /'s from path (for easier parsing)
                path = (path.charAt(0) === '/') ? path.substr(1) : path;
                path = (path.charAt(path.length - 1) === '/') ? path.substring(0, path.length - 1) : path;

                // parse the path by /'s
                var pathParts = path.split('/');
                var componentFound = false;
                if(pathParts && pathParts.length){
                    var componentName = pathParts[0];   // component name is part before first '/'
                    var params = pathParts.slice(1);    // params are everything after first '/'

                    // search for the given componentName in the configured components
                    // set it into the workspace when a match is found
                    angular.forEach(ui.components, function(component, componentIdx){
                        if(component.name===componentName){
                            ui.setWorkspace(workspace, component, params);
                            componentFound = true;
                        }
                    });
                    // component not found in ui.components - search in ui.notify.components
                    if(!componentFound){
                        angular.forEach(ui.notify.components, function(component, componentIdx){
                            if(component.name===componentName){
                                ui.setWorkspace(workspace, component, params);
                                componentFound = true;
                            }
                        });
                    }
                }

                // if the first part of the path is not a valid component, load the default component
                if(!componentFound){
                    angular.forEach(ui.components, function(component, componentIdx){
                        if(component.default){
                            ui.setWorkspace(workspace, component, pathParts);
                            componentFound = true;
                        }
                    });
                }
                // at this point if !componentFound - then there isn't even a default component configured
            }
        },
		loadState: function (fromPath, withParams) {
			var path = angular.isDefined(fromPath) ? fromPath : ui.path;
			var params = angular.isDefined(withParams) ? withParams : ui.params;

            if(path){
                ui.loadPath(path, 'main');
            }

            angular.forEach(params, function(value, workspace){
                ui.loadPath(value, workspace);
            });
		}
	};
	return ui;
}]);