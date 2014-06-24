angular.module('mngr').factory('models',function(ui, data) {

	var models = {
		// ecodocs Layout Directive Models
		table:{
			show:'',
			showSorting:'',
			showFiltering:'',
			showHeading:'',
			header:[{}],
			footer:[{}],
			sortables :[],
			filters:[{}],
			data:[{}]
		},
		item:{
			show:'',
			showHeading:'',
			showMedia:'',
			showActions:'',
			id:'',
			name:'',
			header:{
				title:'',
				quickEdit:[{}],
				quickInfo:[{}]
			},
			details:[{}],
			actions:[{}],
			interactions:[{}],
			media:[{}]
		},
		form:{
			model:'',
			name:'',
			sections:[{
				name:'',
				icon:'',
				inputs:[{
					model:'',
					icon:'',
					type:'',
					options:[{name:'',value:''}],
					help:''
				}]
			}],
			confirm:{},
			deny:{}

		},

		// ecodocs Primary Directive Models
		products: [
			{name:'upc',value:'',type:'text',element:'input'},
			{name:'brand',value:'',type:'text',element:'input'},
			{name:'categories',value:[''],type:'text',element:'input'},
			{name:'name',value:'',type:'text',element:'input'},
			{name:'price',value:'',type:'number',element:'input'},
			{name:'size',value:'',type:'text',element:'select',options:[{}]},
			{name:'quantity',value:'',type:'number',element:'input'},
			{name:'low stock',value:'',type:'number',element:'input'},
			{name:'minimum order',value:'',type:'number',element:'input'},
			{name:'units',value:'',type:'text',element:'input'},
			{name:'supplier',value:[''],type:'text',element:'input'},
			{name:'messages',value:[''],type:'text',element:'input'},
			{name:'events',value:[''],type:'text',element:'input'},
			{name:'notes',value:[''],type:'text',element:'input'}
		],
		sortables: {
			products: [
				{name: 'name', link: 'stock/:id', 'show': true, type: 'text', priority: 1},
				{name: 'stock', show: false, type: 'number', priority: 5},
				{name: 'price', show: false, type: 'number', display: 'currency', priority: 3},
				{name: 'categories', title: 'category', show: false, type: 'categories', priority: 7},
				{name: 'suppliers', show: false, type: 'static', priority: 10}
			],
			events: [
				{name: 'date', 'show': true, type: 'number', priority: 1},
				{name: 'title', title: 'name', link: 'events/:id', show: true, type: 'text', priority: 5},
				{name: 'type', show: true, type: 'text', priority: 3},
				{name: 'attendees', show: false, type: 'text', priority: 7}
			],
			messages: [
				{name: 'from', 'show': true, type: 'text', priority: 1},
				{name: 'subject', link: 'messages/:id', show: true, type: 'text', priority: 5},
				{name: 'time', show: true, type: 'number', priority: 3}
			],
			orders: [
				{name: 'order', link: 'orders/:id', 'show': true, type: 'text', priority: 1},
				{name: 'date', show: true, type: 'number', priority: 5},
				{name: 'type', show: true, type: 'text', priority: 3},
				{name: 'total', show: true, type: 'text', priority: 7}
			],
			users: [
				{name: 'name', link: 'users/:id', 'show': true, type: 'text', priority: 1},
				{name: 'roles', show: true, type: 'text', priority: 5},
				{name: 'email', show: true, type: 'text', priority: 3},
				{name: 'orders', show: true, type: 'text', priority: 7}
			],
			notices: [
				{name: 'time', 'show': true, type: 'number', priority: 1},
				{name: 'content', link: 'notices/:id', show: true, type: 'text', priority: 5},
				{name: 'type', show: true, type: 'text', priority: 3}
			]
		},
		filters:{
			products:[
				{}
			],
			users:[
				{}
			],
			products:[
				{}
			],
			content:[
				{}
			],
			orders:[
				{}
			],
			events:[
				{}
			],
			messages:[
				{}
			],
			notes:[
				{}
			],
			notices:[
				{}
			]

		}

	};


	return models;
});