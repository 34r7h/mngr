angular.module("mngr.utility").filter('mngrDisplay', function($filter){
    return function(value, filterName) {
        return $filter(filterName)(value);
    };
});

angular.module("mngr.utility").filter("mngrLinkTo", function($location){
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