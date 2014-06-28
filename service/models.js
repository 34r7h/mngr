angular.module('mngr').factory('models',function() {

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
					help:'',
					properties:[{name:'', value:''}]
				}]
			}],
			confirm:{},
			deny:{}

		},
		button:{
			type:'',
			function:'',
			text:'',
			subText:'',
			style:{}
		},
		link:{

		},
		input:{},
		// ecodocs Primary Directive Models.
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
			{name:'notes',value:[''],type:'text',element:'input'},
			{name:'updated',value:[''],type:'text', element:'input'}
		],
		orders: [
			{name:'name',value:'',type:'text',element:'input'},
			{name:'items',value:'',type:'text',element:'input'},
			{name:'total',value:'',type:'text',element:'input'},
			{name:'users',value:[''],type:'text',element:'input'},
			{name:'employee',value:'',type:'text',element:'input'},
			{name:'timestamp',value:'',type:'number',element:'input'},
			{name:'transactions',value:'',type:'text',element:'select',options:[{}]},
			{name:'paid',value:'',type:'number',element:'input'},
			{name:'fulfilled',value:'',type:'number',element:'input'},
			{name:'status order',value:'',type:'number',element:'input'},
			{name:'paymentBalance',value:'',type:'text',element:'input'},
			{name:'fulfillmentBalance',value:[''],type:'text',element:'input'},
			{name:'type',value:[''],type:'text',element:'input'},
			{name:'messages',value:[''],type:'text',element:'input'},
			{name:'notes',value:[''],type:'text',element:'input'},
			{name:'events',value:[''],type:'text',element:'input'},
			{name:'notices',value:[''],type:'text',element:'input'}
		],
		users: [
			{name:'name',value:'',type:'text',element:'input'},
			{name:'activeOrder',value:'',type:'text',element:'input'},
			{name:'events',value:'',type:'text',element:'input'},
			{name:'email',value:[''],type:'text',element:'input'},
			{name:'linked',value:'',type:'text',element:'input'},
			{name:'messages',value:'',type:'number',element:'input'},
			{name:'orders',value:'',type:'text',element:'select',options:[{}]},
			{name:'roles',value:'',type:'number',element:'input'},
			{name:'settings',value:'',type:'number',element:'input'},
			{name:'notes',value:[''],type:'text',element:'input'},
			{name:'notices',value:[''],type:'text',element:'input'}
		],
		contents: [
			{name:'title',value:'',type:'text',element:'input'},
			{name:'content',value:'',element:'textarea'},
			{name:'author',value:'',type:'text',element:'input'},
			{name:'categories',value:[''],type:'text',element:'input'},
			{name:'tags',value:[''],type:'text',element:'input'},
			{name:'links',value:[''],type:'number',element:'input'},
			{name:'media',value:[{}],type:'text',element:'select',options:[{}]},
			{name:'notes',value:[''],type:'text',element:'input'}
		],
		//ecodocs Support Directive Models.
		messages:[
			{name:'title',value:'',type:'text',element:'input'},
			{name:'date',value:'',element:'input'},
			{name:'description',value:'',element:'textarea'},
			{name:'threads',value:[{}],type:'text',element:'input'},
			{name:'attachedTo',value:[{}],type:'text',element:'input'}
		],
		events:[
			{name:'title',value:'',type:'text',element:'input'},
			{name:'date',value:'',element:'input'},
			{name:'description',value:'',element:'textarea'},
			{name:'threads',value:[{}],type:'text',element:'input'},
			{name:'attachedTo',value:[{}],type:'text',element:'input'},
			{name:'messages',value:[{}],type:'text',element:'input'},
			{name:'type',value:'',type:'text',element:'input'},
			{name:'users',value:[''],type:'text',element:'input'}

		],
		notices:[
			{name:'title',value:'',type:'text',element:'input'},
			{name:'date',value:'',element:'input'},
			{name:'content',value:'',element:'textarea'},
			{name:'users',value:[''],type:'text',element:'input'},
			{name:'attachedTo',value:[{}],type:'text',element:'input'},
			{name:'type',value:'',type:'text',element:'input'}
		],
		notes:[
			{name:'date',value:'',element:'input'},
			{name:'content',value:'',element:'textarea'},
			{name:'attachedTo',value:[{}],type:'text',element:'input'},
			{name:'type',value:'',type:'text',element:'input'}
		],
		//ecodocs table models.
		sortables: {
			products: [
                {name: 'upc', 'show': false, type: 'text', priority: 1},
				{name: 'name', link: 'stock/:id', 'show': true, type: 'text', priority: 2},
				{name: 'stock', show: true, type: 'number', priority: 5},
				{name: 'price', show: false, type: 'number', display: 'currency', priority: 3},
				{name: 'categories', title: 'category', show: false, type: 'categories', priority: 7},
				{name: 'suppliers', show: false, type: 'static', priority: 10},
				{name: 'updated', show: true, type: 'static', priority: 10}
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
				{name: 'name', title: 'order', link: 'orders/:id', 'show': true, type: 'text', priority: 1},
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
		//ecodocs filter models.
		filters:{
			products:[
                {   name: 'Name',
                    type: 'text',
                    model: 'name',
                    value: '',
                    priority: 10
                },
                {   name: 'Price',
                    type: 'number',
                    model: 'price',
                    operands: ['=', '<', '>', '><'],
                    value: '',
                    value2: '',
                    operand: '=',
                    priority: 10
                },
                {   name: 'UPC',
                    type: 'text',
                    model: 'upc',
                    value: '',
                    priority: 10
                },
				{
					name: 'Updated',
					type:'button',
					model:'updated',
					value:Date(),
					priority: 10
				}
			],
			users:[
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
		},
        searchable: ['products', 'orders']
	};
	return models;
});