angular.module('mngr.utility')
    .directive('mngrScrollPages', function () {
        return {
            link: function (scope, element, attrs) {
                var offset = parseInt(attrs.threshold) || 0;
                var e = element[0];
                var nextPage = attrs.nextPage?attrs.nextPage:null;
                var prevPage = attrs.prevPage?attrs.prevPage:null;
                var lastTop = -1;

                element.bind('scroll', function () {
                    if(prevPage && e.scrollTop < lastTop && e.scrollTop <= offset){
                        if(scope.$apply(prevPage) && attrs.backScroll){
                            lastTop = -1;
                            e.scrollTop = e.scrollHeight-e.offsetHeight-offset-1;
                        }
                    }
                    if(nextPage && e.scrollTop + e.offsetHeight >= e.scrollHeight - offset) {
                        if(scope.$apply(nextPage) && attrs.backScroll){
                            e.scrollTop = offset+1;
                        }
                    }
                    lastTop = e.scrollTop;
                });
            }
        };
    }
);