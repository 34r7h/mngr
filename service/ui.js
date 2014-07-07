angular.module('mngr').factory('ui',['$q',function($q) {

	var ui = {
		components:[
<<<<<<< HEAD
			{name:'stock',icon:'fa fa-barcode',params:['product-id']},
=======
			{name:'products',icon:'fa fa-barcode',params:['product-id']},

>>>>>>> f9aec33bf4ece5208ea9d68ea4d58398e8668895
			{name:'shop',icon:'fa fa-gift',params:['path'],default:true},
			{name:'orders',icon:'fa fa-barcode',params:['order-id']},
			{name:'users',icon:'fa fa-barcode',params:['user-id']},
			{name:'content',icon:'fa fa-barcode',params:[]}
		],
		workspace: {
			overlay: {
				show: false,
<<<<<<< HEAD
				component: 'stock',
                params: {},
=======
				component: 'products',
				params: {},

>>>>>>> f9aec33bf4ece5208ea9d68ea4d58398e8668895
				view: '',
				icon:'fa fa-leaf'
			},
			main: {
				show: true,
				component: '',
<<<<<<< HEAD
                params: {},
=======
				params: {},

>>>>>>> f9aec33bf4ece5208ea9d68ea4d58398e8668895
				view: '',
				icon:'fa fa-leaf'
			},
			underlay: {
				show: false,
				component: '',
<<<<<<< HEAD
                params: {},
=======
				params: {},

>>>>>>> f9aec33bf4ece5208ea9d68ea4d58398e8668895
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
				{name:'messages', icon:'fa fa-envelope', params:['message-id']},
				{name:'events', icon:'fa fa-calendar', params:['event-id']},
				{name:'cart', icon:'fa fa-shopping-cart', params:['order-id']},
<<<<<<< HEAD
				{name:'notices', icon:'fa fa-globe', params:['notice-id']}
=======
				{name:'notices', icon:'fa fa-globe', params:[]}
>>>>>>> f9aec33bf4ece5208ea9d68ea4d58398e8668895
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
		params:""
	};
	return ui;
}]);