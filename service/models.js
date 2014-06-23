angular.module('mngr').factory('models',function() {

	var models = {
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
		]

	};


	return models;
});