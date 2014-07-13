/**
 * Created by io on 14-07-12.
 * Stick this in your controller somewhere then {{vendArray in your view}}
 * a most inefficient way to export mngr products to vend.
 */
$scope.vendExport = function(){
	$scope.vendArray = [];
	/*
	 for (var i; i < $scope.data.products.array.length; i++) {
	 console.log('hi');
	 }
	 */
	angular.forEach($scope.data.products.array,function(key,value){
		//console.log($scope.data.products.array[value].suppliers[0]);

		var supplierValues = ['price','name','sku'];
		angular.forEach(supplierValues,function(valu){
			console.log(valu+ ' '+ key);
			if(!$scope.data.products.array[value][valu]){
				$scope.data.products.array[value][valu] = '';
				console.log($scope.data.products.array[value][valu]);
			}

		});
		$scope.vendArray.push({
			'id':$scope.data.products.array[value].$id,
			'handle':'',
			'sku':$scope.data.products.array[value].sku,
			'composite_handle':'',
			'composite_sku':'',
			'composite_quantity':'',
			'name':$scope.data.products.array[value].name,
			'description':'',
			//'type':$scope.data.products.array[value].categories[0],
			'variant_option_one_name':'',
			'variant_option_one_value':'',
			'variant_option_two_name':'',
			'variant_option_two_value':'',
			'variant_option_three_name':'',
			'variant_option_three_value':'',
			'tags':'',
			//'supply_price':$scope.data.products.array[value].suppliers['0'].price,
			'retail_price':$scope.data.products.array[value].price,
			'outlet_tax_Main_Outlet':'',
			'account_code':'',
			'account_code_purchase':'',
			'brand_name':'',
			//'supplier_name':$scope.data.products.array[value].suppliers['0'].name,
			//'supplier_code':$scope.data.products.array[value].suppliers['0'].sku,
			'active':'1',
			'track_inventory':'0',
			'inventory_Main_Outlet':$scope.data.products.array[value].stock,
			'reorder_point_Main_Outlet':$scope.data.products.array[value].lowStock,
			'restock_level_Main_Outlet':$scope.data.products.array[value].minOrder
		});
		//$scope.vendArray.push({id:$scope.data.products.array[value].id});
		//$scope.vendArray.push({sku:$scope.data.products.array[value].sku});
		//this.vendArray[value].name = $scope.data.products.array[value].name;
		//console.log(key);
		//this.vendArray[key].name = value.name;


	}, this);
	console.log($scope.vendArray);
};