angular.module("mngr.util")
	.filter('mngrDisplay', function($filter){
		return function(value, filterName) {
			return $filter(filterName)(value);
		};
	})

	.filter('operandText', function($filter){
		return function(operandCode, rangeType) {
			var result = operandCode;
			switch(operandCode){
				case '=':
					result = 'equals';
					break;
				case '>':
					result = (rangeType==='date')?'after':'greater than';
					break;
				case '<':
					result = (rangeType==='date')?'before':'less than';
					break;
				case '><':
					result = 'between';
					break;
			}
			return result;
		};
})

	.filter("mngrLinkTo", function($location){
	return function(link, item, workspace) {
		workspace = angular.isDefined(workspace)?workspace:'main';
		if(item.$id){
			link = link.replace(':id', item.$id);
		}

		var linkPath = $location.path();
		if(workspace === 'main'){
			linkPath = link;
		}

		var searchStr = '';
		var hasWorkspace = false;
		angular.forEach($location.search(), function(value, key){
			if(key === workspace){
				value = link;
				hasWorkspace = true;
			}
			searchStr += ((searchStr !== '')?'&':'?')+key+'='+value;
		});
		if(!hasWorkspace && workspace && workspace !== 'main'){
			searchStr += (searchStr?'&':'?')+workspace+'='+link;
		}

		return '/#'+((!linkPath || linkPath.charAt(0)!=='/')?'/':'')+linkPath+searchStr;
	};
});