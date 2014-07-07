angular.module('mngr').directive('stock', function(ui,data,api,models) {
	return {
		controller: function($scope){
			$scope.type = 'products';
			$scope.typeSingular = 'product';

			$scope.showTable=true;
			$scope.showItem=false;
			$scope.showForm=false;

			$scope.table = {
				show:'',
				sortables : models.sortables[$scope.type],
				filters: models.filters[$scope.type],
				data: data[$scope.type]
			};
			if($scope.productId){
				$scope.itemModel = models.item;
				$scope.itemModel.actions = [
					{name: 'addNewProduct', action:function(){console.log('new product served');}},
					{name: 'cloneProduct',action:function(){console.log('this product cloned');}},
					{name: 'removeProduct', action:function(){console.log('this product removed');}},
					{name: 'newMessage',action:function(){console.log('new product message');}}
				];
				$scope.itemModel.interactions = [
					{name: 'Messages',action:function(){console.log('this product cloned');}},
					{name: 'Events', action:function(){console.log('this product removed');}},
					{name: 'Notices',action:function(){console.log('new product message');}}
				];
				$scope.itemModel.details = [
					{name:'Image Url',value:function(){return $scope.product.imgUrl;},type:'edit',model:'imgUrl'},
					{name:'Suppliers',value:function(){return $scope.product.suppliers;},type:'edit',model:'suppliers'},
					{name:'Tax Rate',value:function(){return $scope.product.tax;},type:'edit',model:'tax'},
					{name:'Shops',value:function(){return $scope.product.shops;},type:'edit',model:'shops'},
					{name:'Variations',value:function(){return $scope.product.variations;},type:'edit',model:'variations'}
				];
				$scope.itemModel.header = {
					name:function(){
						return $scope.product.name;
					},
					interests:[
						{
							name:'Current Price',
							value:function(){return $scope.product.price;},
							type:'edit',
							model:'price'
						},
						{
							name:'In Stock',
							value:function(){return $scope.product.stock;},
							type:'edit',
							model:'stock'
						},
						{
							name:'Add to',
							value:function(){return 'Order';},
							type:'button',
							action:function(){
								if(currentOrder){
									data.orders.fire.$child(currentOrder).items.push('This Product');
								} else {
									api.create('orders',$parent.model.orders);
									console.log('Outbound');
								}

							}
						}
					]

				};
				$scope.itemModel.footer = [
					{name:'SKU',value:function(){return $scope.product.sku;},type:'edit',model:'sku'},
					{name:'UPC',value:function(){return $scope.product.upc;},type:'edit',model:'upc'},
					{name:'Min Order',value:function(){return $scope.product.minOrder;},type:'edit',model:'minOrder'},
					{name:'Low Stock',value:function(){return $scope.product.lowStock;},type:'edit',model:'lowStock'}
				];
			}

			$scope.form = {
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
				confirm:{}

			};

            $scope.workspace = $scope.$parent.workspace; // because we are isolating scope, it doesn't come through

            $scope.api = api;

            if($scope.productId){
                $scope.showTable = false;
                $scope.showItem = true;
                $scope.product = data[$scope.type].fire.$child($scope.productId);
            }
            else{
                $scope.showTable = true;
            }
		},
		scope:{productId:'='},
		restrict: 'EA',
		template: '<mngr-table ng-show="showTable"></mngr-table><mngr-form ng-show="showForm"></mngr-form><mngr-item ng-show="showItem" item="product"></mngr-item>',
		link: function(scope, element, attrs, fn) {


		}
	};
});